import mongoose from "mongoose";
import crypto from "crypto";
import config from "./config";
import User from "./models/User";
import Tour from "./models/Tour";
import Guide from "./models/Guide";
import Review from "./models/Review";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("tours");
    await db.dropCollection("guides");
    await db.dropCollection("reviews");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [user, user1, user2, user3, user4, user5] = await User.create(
    {
      username: "guide",
      email: "guide@gmail.com",
      displayName: "Guide",
      password: "qwerty1234",
      role: "guid",
      token: crypto.randomUUID(),
    },
    {
      username: "guide2",
      email: "guide@gmail.com",
      displayName: "Guide2",
      password: "qwerty1234",
      role: "guid",
      token: crypto.randomUUID(),
    },
    {
      username: "guide3",
      email: "guide@gmail.com",
      displayName: "Guide3",
      password: "qwerty1234",
      role: "guid",
      token: crypto.randomUUID(),
    },
    {
      username: "user",
      email: "user@gmail.com",
      displayName: "User",
      password: "qwerty1234",
      role: "user",
      token: crypto.randomUUID(),
    },
    {
      username: "admin",
      email: "admin@gmail.com",
      displayName: "Admin",
      password: "qwerty1234",
      role: "admin",
      token: crypto.randomUUID(),
    },
    {
      username: "moderator",
      email: "moderator@gmail.com",
      displayName: "Moderator",
      password: "qwerty1234",
      role: "moderator",
      token: crypto.randomUUID(),
    },
  );

  const [Artem, Andrey, Askar] = await Guide.create(
    {
      user: user._id,
      languages: ["kyrgyz", "russian", "english"],
      country: "Kyrgyzstan",
      rating: ["good"],
    },
    {
      user: user1._id,
      languages: ["russian", "english"],
      country: "Kyrgyzstan",
      rating: ["good"],
    },
    {
      user: user2._id,
      languages: ["kyrgyz", "english"],
      country: "Kyrgyzstan",
      rating: ["good"],
    },
  );

  const [Burana, AlaKul, Canyon, IssykKul, SaryChelek, Osh, Naryn] =
    await Tour.create(
      {
        guid: Artem._id,
        category: ["history"],
        name: "Explore Burana Tower",
        description:
          "The Burana Tower is a large minaret in the Chuy Valley in northern Kyrgyzstan. It is located about 80 km east of the country's capital Bishkek, near the town of Tokmok. The tower, along with grave markers, some earthworks and the remnants of a castle and three mausoleums, is all that remains of the ancient city of Balasagun, which was established by the Karakhanids at the end of the 9th century. The tower was built in the 11th century and was used as a template for other minarets. An external staircase and steep, winding stairway inside the tower enables visitors to climb to the top. It is one of the oldest architectural constructions in Central Asia.",
        startDate: "2023-10-30T17:11:22.353Z",
        endDate: "2023-11-01T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/burana.jpeg",
        price: 800,
      },
      {
        guid: Andrey._id,
        category: ["history"],
        name: "Fascinating Ala-Kul Tour",
        description:
          "Ala Kul lake is located at an altitude of 3500 m, 20 kilometers south of the city of Karakol. The best time to visit Ala Kul lake is between early July and the end of September.  The trail to Ala Kul is well-marked, and you will find other hikers along during the hiking season, so you can hike to Ala Kul alone too.",
        startDate: "2023-11-04T17:11:22.353Z",
        endDate: "2023-11-06T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/ala-kul.jpeg",
        price: 1500,
      },
      {
        guid: Askar._id,
        category: ["history"],
        name: "Fairytale Canyon Skazka Tour",
        description:
          'Skazka (Fairy Tale) Canyon, located on the southern shore of Issyk-Kul Lake, is one of the most interesting and frequently visited natural places in Kyrgyzstan. It is located 120 kilometers from Balykchi and not far from the village of Tosor. The canyon is located in the gorge of the same name and is famous for its red clay rocks. The wind has been polishing natural and fabulous sculptures here for years. One of the most famous rocks is the "Chinese Wall". So it was nicknamed by the people due to its similarity to the famous architectural monument of China. Walking through the labyrinths of the canyon, you will feel like in a real fairy tale. No wonder the gorge is named that way. The rocks resemble castles, towers, monsters, giants, people and animals. And all this is created by nature, not by the hands of people.',
        startDate: "2024-05-15T17:11:22.353Z",
        endDate: "2024-05-16T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/canyon-skazka.jpeg",
        price: 2000,
      },
      {
        guid: Artem._id,
        category: ["history"],
        name: "Isskyl-Lake - the pearl of Kyrgyzstan",
        description:
          "Issyk-Kul tours is a journey to the second largest salt lake and sixth deepest lake in the world. Entitled Kyrgyz Baikal for its enormous size, Issyk-Kul does not freeze in winter. The combination of sea and mountainous climate, coniferous forests, thermal springs make Issyk-Kul the place, where your body and soul can rest. Issyk-Kul Lake is surrounded by many intersting sights, including Stone garden withpetroglyphs datingback to the 2000 B.C - 4th century A.D and the cultural center Ruh-Ordo with an old chapel to honor four confessions of the world.",
        startDate: "2024-07-06T17:11:22.353Z",
        endDate: "2024-07-09T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/issyk-kul.jpeg",
        price: 6000,
      },
      {
        guid: Askar._id,
        category: ["history"],
        name: "Amazing Tour to the Sary-Chelek",
        description:
          "Sary Chelek is located in the Jalal-Abad region in the west of Kyrgyzstan, tucked into the Western Tien Shan Mountains at the foot of the Chatkal Mountain Range. This alpine lake is the highlight of a larger area called Sary Chelek Nature Reserve which has been declared as a UNESCO Biosphere Reserve in 1978. The reserve has seven alpine lakes with Sary Chelek Lake being the largest one. Located at an altitude of 1887 meters and created by a landslide, the lake covers almost 500 hectares. The depth varies across the lake, with its deepest point at 245 meters.",
        startDate: "2024-08-01T17:11:22.353Z",
        endDate: "2024-08-03T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/sary-chelek.jpeg",
        price: 3700,
      },
      {
        guid: Andrey._id,
        category: ["history"],
        name: "Tour around the Osh city",
        description:
          'Osh tour will introduce you one of the most ancient cities of Central Asia and the second largest city in Kyrgyzstan. The main sight of Osh is the mountain "Solomon\'s Throne" that had been the second Mecca for local Muslims. Legends have endowed the mountain with the might able to heal any disease. There is a museum-reserve inside the mountain consisting of artificial and natural caves. Another sight worth a visit is Shaid Tepa, the largest mosque in Kyrgyzstan.',
        startDate: "2023-11-01T17:11:22.353Z",
        endDate: "2023-11-06T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/osh.jpeg",
        price: 6900,
      },
      {
        guid: Andrey._id,
        category: ["history"],
        name: "Ancient Naryn town Tour",
        description:
          "Naryn town is the administrative center of the Naryn Region. The town is situated on the banks of the Naryn River (the main headwaters of the Syr Darya). Naryn is the main path of the Great Silk Road, today it connects China, via Torugart Pass. The population of the Naryn Region is 99% Kyrgyz",
        startDate: "2023-11-01T17:11:22.353Z",
        endDate: "2023-11-04T17:11:22.353Z",
        country: "Kyrgyzstan",
        image: "fixtures/naryn.jpeg",
        price: 4500,
      },
    );

  const [review1, review2, review3, review5, review6] = await Review.create(
    {
      user: user._id,
      tour: Burana._id,
      guide: Artem._id,
      commentTour: "Nice tour!",
      ratingTour: 5,
      commentGuide: "Good guide!",
      ratingGuide: 5,
      date: "2023-11-01T17:11:22.353Z",
    },
    {
      user: user._id,
      tour: AlaKul._id,
      guide: Andrey._id,
      commentTour: "Not bad tour! Pretty nice guide!",
      ratingTour: 4,
      commentGuide: "Good guide!",
      ratingGuide: 5,
      date: "2023-11-01T17:11:22.353Z",
    },
    {
      user: user._id,
      tour: Canyon._id,
      guide: Askar._id,
      commentTour: "Good one! I love it!",
      ratingTour: 5,
      commentGuide: "Good guide!",
      ratingGuide: 5,
      date: "2024-05-17T17:11:22.353Z",
    },
    {
      user: user._id,
      tour: IssykKul._id,
      guide: Artem._id,
      commentTour: "Very beautiful place",
      ratingTour: 5,
      commentGuide: "Good guide!",
      ratingGuide: 5,
      date: "2024-07-09T17:11:22.353Z",
    },
    {
      user: user._id,
      tour: SaryChelek._id,
      guide: Askar._id,
      commentTour: "Amazing place, but it was cold!",
      ratingTour: 4,
      commentGuide: "Good guide!",
      ratingGuide: 5,
      date: "2024-08-05T17:11:22.353Z",
    },
  );
  await db.close();
};

run().catch(console.error);
