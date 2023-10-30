import mongoose, { HydratedDocument, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../type";
import { randomUUID } from "crypto";

const SALT_WORK_FACTOR = 10;

export interface IUserMethods extends IUser {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<IUser, NonNullable<unknown>, IUserMethods>;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (
        this: HydratedDocument<IUser>,
        username: string,
      ): Promise<boolean> {
        if (!this.isModified("username")) return true;
        const user: HydratedDocument<IUser> | null = await User.findOne({
          username,
        });
        return !user;
      },
      message: "This user is already registered",
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "moderator", "guid"],
  },
  displayName: {
    type: String,
    required: true,
  },
  googleID: String,
  appleID: String,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
UserSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = mongoose.model<IUser, UserModel>("User", UserSchema);
export default User;
