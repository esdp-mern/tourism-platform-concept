import mongoose from "mongoose";
import crypto from "crypto";
import config from "./config";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user, user1, user2, user3] = await User.create({
        username: 'guide',
        email: 'guide@gmail.com',
        displayName: 'Guide',
        password: 'qwerty1234',
        role: 'gid',
        token: crypto.randomUUID(),
    }, {
        username: 'user',
        email: 'user@gmail.com',
        displayName: 'User',
        password: 'qwerty1234',
        role: 'user',
        token: crypto.randomUUID(),
    }, {
        username: 'admin',
        email: 'admin@gmail.com',
        displayName: 'Admin',
        password: 'qwerty1234',
        role: 'admin',
        token: crypto.randomUUID(),
    },{
        username: 'moderator',
        email: 'moderator@gmail.com',
        displayName: 'Moderator',
        password: 'qwerty1234',
        role: 'moderator',
        token: crypto.randomUUID(),
    });


    await db.close();
};

run().catch(console.error);