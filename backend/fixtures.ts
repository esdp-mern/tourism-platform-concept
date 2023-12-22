import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from './models/User';
import Tour from './models/Tour';
import Guide from './models/Guide';
import TourReview from './models/TourReview';
import Order from './models/Order';
import News from './models/News';
import Employee from './models/Employee';
import GuideReview from './models/GuideReview';
import PlatformReview from './models/PlatformReview';
import TourRating from './models/TourRating';
import GuideRating from './models/GuideRating';
import Partner from './models/Partner';
import MainSlider from './models/MainSlider';
import ContactUs from './models/ContactUs';
import AboutUs from './models/AboutUs';
import GuideOrder from './models/GuideOrder';
import PartnerOrder from './models/PartnerOrder';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('tours');
    await db.dropCollection('guides');
    await db.dropCollection('orders');
    await db.dropCollection('news');
    await db.dropCollection('employees');
    await db.dropCollection('guidereviews');
    await db.dropCollection('platformreviews');
    await db.dropCollection('tourreviews');
    await db.dropCollection('tourratings');
    await db.dropCollection('guideratings');
    await db.dropCollection('partners');
    await db.dropCollection('mainsliders');
    await db.dropCollection('aboutus');
    await db.dropCollection('contacts');
    await db.dropCollection('guideorders');
    await db.dropCollection('partnerorders');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user, user1, user2, user3] = await User.create(
    {
      username: 'guide',
      email: 'guide@gmail.com',
      displayName: 'Guide',
      password: 'qwerty1234',
      role: 'guid',
      avatar: 'fixtures/mordecai.png',
      token: crypto.randomUUID(),
    },
    {
      username: 'guide2',
      email: 'guide@gmail.com',
      displayName: 'Guide2',
      password: 'qwerty1234',
      role: 'guid',
      avatar: 'fixtures/gumball.jpg',
      token: crypto.randomUUID(),
    },
    {
      username: 'guide3',
      email: 'guide@gmail.com',
      displayName: 'Guide3',
      password: 'qwerty1234',
      role: 'guid',
      avatar: 'fixtures/kuroro.jpeg',
      token: crypto.randomUUID(),
    },
    {
      username: 'user',
      email: 'user@gmail.com',
      displayName: 'Chris',
      password: 'qwerty1234',
      role: 'user',
      avatar: 'fixtures/midjourney.webp',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin',
      email: 'admin@gmail.com',
      displayName: 'Admin',
      password: 'qwerty1234',
      role: 'admin',
      avatar: 'fixtures/admin.png',
      token: crypto.randomUUID(),
    },
    {
      username: 'moderator',
      email: 'moderator@gmail.com',
      displayName: 'Moderator',
      password: 'qwerty1234',
      role: 'moderator',
      avatar: 'fixtures/moderator.jpg',
      token: crypto.randomUUID(),
    },
  );

  const [Artem, Andrey, Askar] = await Guide.create(
    {
      user: user._id,
      description:
        'My name is Artem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut facilis ipsa iure nesciunt officia quasi quibusdam quo, vel voluptatibus.',
      languages: ['kyrgyz', 'russian', 'english'],
      country: 'Kyrgyzstan',
      isPublished: true,
    },
    {
      user: user1._id,
      description:
        'My name is Andrey.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut facilis ipsa iure nesciunt officia quasi quibusdam quo, vel voluptatibus.',
      languages: ['russian', 'english'],
      country: 'Kyrgyzstan',
      isPublished: true,
    },
    {
      user: user2._id,
      description:
        'My name is Askar.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut facilis ipsa iure nesciunt officia quasi quibusdam quo, vel voluptatibus.',
      languages: ['kyrgyz', 'english'],
      country: 'Kyrgyzstan',
      isPublished: false,
    },
  );

  const [Burana, Canyon, IssykKul, Osh, SaryChelek, Naryn, AlaKul] =
    await Tour.create(
      {
        guides: [Artem._id, Andrey._id],
        name: 'Explore Burana Tower',
        mainImage: 'fixtures/burana.jpeg',
        description:
          "The Burana Tower is a large minaret in the Chuy Valley in northern Kyrgyzstan. It is located about 80 km east of the country's capital Bishkek, near the town of Tokmok. The tower, along with grave markers, some earthworks and the remnants of a castle and three mausoleums, is all that remains of the ancient city of Balasagun, which was established by the Karakhanids at the end of the 9th century. The tower was built in the 11th century and was used as a template for other minarets. An external staircase and steep, winding stairway inside the tower enables visitors to climb to the top. It is one of the oldest architectural constructions in Central Asia.",
        category: ['history', 'exotic'],
        price: 800,
        duration: 1,
        plan: [
          {
            title: 'Visiting Burana Tower',
            planDescription:
              'In the morning you’ll be picked up from a hotel to start your exciting tour. We’ll head towards Burana Tower to the small town of Tokmok (80km from Bishkek). Your guide will show you the mausoleums and other buildings discovered by archaeologists during excavations, you will have a chance to climb to the top of the ancient tower, where there is a beautiful view of the Chui valley and the Tien-Shan mountains open.',
          },
        ],
        destination: 'Tokmak, Burana Tower',
        arrival: 'Akhunbaev st. 75',
        departure: '10 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Museum Tickets', 'Group Guide', 'Transport'],
        galleryTour: ['fixtures/burana.jpeg', 'fixtures/burana2.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
        routes: [
          [
            {
              id: 'sksggDv9AkoLUnqS5Ks64',
              coordinates: '42.812536, 74.645357',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: '6xztxMUPOZK2xprCm5y7f',
              coordinates: '42.801027, 74.649165',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: '9bvCO8GoDJiA7sJxAP0pr',
              coordinates: '42.800938, 74.651593',
              icon: {
                src: 'mapMarkers/camera-map-marker.svg',
                type: 'camera',
              },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: 'ddp4WZy7mY3iLCQ7HOfCM',
              coordinates: '42.801066, 74.653824',
              icon: { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: 'bsztOOJVkb3LXjgqPsTyU',
              coordinates: '42.797932, 74.670694',
              icon: { src: 'mapMarkers/park-map-marker.svg', type: 'park' },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: 'pn5qHKrDUsadt6vnVl9FB',
              coordinates: '42.795424, 74.67018',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
            {
              id: 'B6ICF3gDKT92x5dU67FNz',
              coordinates: '42.794184, 74.669594',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#9b33fc',
            },
          ],
          [
            {
              id: 'okEsJnCgJjXbgevJqb2GX',
              coordinates: '42.639444, 74.628418',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'hMNHpRvkB7hsdVNthAKlO',
              coordinates: '42.640625, 74.628556',
              icon: { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'uXATrelXHl6ea4VPkR69e',
              coordinates: '42.641644, 74.62802',
              icon: { src: 'mapMarkers/park-map-marker.svg', type: 'park' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'OkpbQV6XNY8ISMrmovEM9',
              coordinates: '42.642644, 74.627746',
              icon: {
                src: 'mapMarkers/camera-map-marker.svg',
                type: 'camera',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'f0pyUjT3D9tCM6ErpVsfk',
              coordinates: '42.642896, 74.628185',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'LkjppM9Y5SQRJQhEuMHnh',
              coordinates: '42.641846, 74.631753',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'LWSnnmcyJLgkwBfAcb8Yx',
              coordinates: '42.642119, 74.632549',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'C3Gwaul73lYqzGyHA4AOW',
              coordinates: '42.641109, 74.634854',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'e3F6K2wzAz36QjmwAxyia',
              coordinates: '42.640322, 74.635403',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'GLY9ZqCkKrjPo7vuCHEhV',
              coordinates: '42.640554, 74.636638',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'ry3YquYUan0VdC5TkOFey',
              coordinates: '42.640504, 74.637008',
              icon: { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'nfXJw1EBAV8RDpFGi1zHB',
              coordinates: '42.639958, 74.637612',
              icon: {
                src: 'mapMarkers/camera-map-marker.svg',
                type: 'camera',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'nfXJw1EBAV8RDpFGi1zHB',
              coordinates: '42.64014, 74.64118',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'Zcsk1lhBQSh1xOlQksyH2',
              coordinates: '42.641409, 74.642463',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: '',
              strokeColor: '#3391fc',
            },
            {
              id: 't4gb9HDtocCc3gghEt8Eh',
              coordinates: '42.642432, 74.643073',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
          ],
        ],
      },
      {
        guides: [Askar._id, Andrey._id],
        name: 'Fairytale Canyon Skazka Tour',
        mainImage: 'fixtures/canyon-skazka.jpeg',
        description:
          'Skazka (Fairy Tale) Canyon, located on the southern shore of Issyk-Kul Lake, is one of the most interesting and frequently visited natural places in Kyrgyzstan. It is located 120 kilometers from Balykchi and not far from the village of Tosor. The canyon is located in the gorge of the same name and is famous for its red clay rocks. The wind has been polishing natural and fabulous sculptures here for years. One of the most famous rocks is the "Chinese Wall". So it was nicknamed by the people due to its similarity to the famous architectural monument of China. Walking through the labyrinths of the canyon, you will feel like in a real fairy tale. No wonder the gorge is named that way. The rocks resemble castles, towers, monsters, giants, people and animals. And all this is created by nature, not by the hands of people.',
        category: ['history', 'popular', 'exotic'],
        price: 2000,
        duration: 1,
        plan: [
          {
            title: 'Visiting Canyon Skazka',
            planDescription:
              'Moving along the south coast of Issyk-Kul lake from Karakol town, before you reach the small village named Kadji-Sai, you have an opportunity to get into the most beautiful mountain landscapes.\n' +
              'Turning after Tosor village towards Terskey Ala-Too mountains and after passing about 4 km, we will notice how mountains part, and immediately, as if by the wave of a magic stick we will find ourselves in this valley of fairytales. In Russian, the word Skazka means “Fairy Tale” and the place is certainly a magical place, full of mystery and mysticism, sufficuent to stimulate the imagination of those with the inclination to stand, and stare, and wonder. ',
          },
        ],
        destination: 'Canyon Skazka',
        arrival: 'Akhunbaev st. 75',
        departure: '10 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Lunch', 'Group Guide', 'Transport'],
        galleryTour: ['fixtures/canyon-skazka.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
      },
      {
        guides: [Artem._id, Askar._id],
        name: 'Isskyl-Lake - the pearl of Kyrgyzstan',
        mainImage: 'fixtures/issyk-kul.jpeg',
        description:
          'Issyk-Kul tours is a journey to the second largest salt lake and sixth deepest lake in the world. Entitled Kyrgyz Baikal for its enormous size, Issyk-Kul does not freeze in winter. The combination of sea and mountainous climate, coniferous forests, thermal springs make Issyk-Kul the place, where your body and soul can rest. Issyk-Kul Lake is surrounded by many intersting sights, including Stone garden withpetroglyphs datingback to the 2000 B.C - 4th century A.D and the cultural center Ruh-Ordo with an old chapel to honor four confessions of the world.',
        category: ['history', 'on budget'],
        price: 6000,
        duration: 3,
        plan: [
          {
            title: 'From Bishkek to Chon Kemin',
            planDescription:
              'Pick-up in the morning in Bishkek (address to be confirmed). Leave the bustle of Bishkek behind and travel across to Kyrgyzstan to the incredible Chon-Kemin Valley, a protected region which is home to some of the most diverse flora and fauna in the country.After a short rest and check-in, enjoy a home-cooked lunch at the guesthouse terrace with a panoramic view of the surrounding mountains and village. Before dinner take a gentle stroll around the village and glean a fascinating insight into rural Kyrgyz life. Possible to do a hiking tour to Chon-Kemin area.',
          },
          {
            title: 'From Chon Kemin to Karakol',
            planDescription:
              'After a nice village style breakfast at the guesthouse, depart to Karakol through the northern shore of the Issyk-Kul Lake. On the way, stop in Cholpon-Ata town. Visit open-air Museum of Petroglyphs (stone inscriptions) that contains more than 2000 petroglyphs dating from 800 BC to 1200 AD. Continue driving to Karakol. Evening free time in Karakol.  ',
          },
          {
            title: 'From Karakol to Jeti Oguz and back to Bishkek',
            planDescription:
              'After an early breakfast the guesthouse drive to Jety Oguz valley where shepherds share many legends about the beautiful, famous, red rocks known as «Seven Bulls» and «Broken Heart». At the base of the cliffs are flat mountain slopes, thickly overgrown with grass and pine trees. The “Broken Heart” rock, located at the entrance to the gorge, offers an especially romantic scene. In Bokonbaevo village, enjoy home-cooked lunch at a local Kyrgyz family’s house. Visit Fairy Tale Canyon with a short hiking tour for 1-2 hrs (weather dependant). Before evening arrive to Bishkek. Drop-off at final destination. End of services.',
          },
        ],
        destination: 'Lake Issyk-Kul',
        arrival: 'Akhunbaev st. 75',
        departure: '11:30 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Museum Tickets', 'Group Guide', 'Transport'],
        galleryTour: ['fixtures/issyk-kul.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: false,
        routes: [
          [
            {
              id: '71LW8CV9p4bMpztYf8Hjq',
              coordinates: '42.639444, 74.628418',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'LzVn9n8j7RtztdX069DW5',
              coordinates: '42.640625, 74.628556',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'jgRYhOSOXFaKGmlTBuhSE',
              coordinates: '42.641644, 74.62802',
              icon: { src: 'mapMarkers/park-map-marker.svg', type: 'park' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'GSJnj7yMiBNH0ZuZo82vX',
              coordinates: '42.642644, 74.627746',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'BW3mrdrCwrtTAkmbB0VUK',
              coordinates: '42.642896, 74.628185',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'KIYFOGgz1bM5pIPS8AhSM',
              coordinates: '42.641846, 74.631753',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'PQrzJMhKYkbtmYKTr1lCV',
              coordinates: '42.642119, 74.632549',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'docyxE28lNCAaOH9ejncV',
              coordinates: '42.641109, 74.634854',
              icon: { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'xxDmYIbhPboi1IS3AYKJu',
              coordinates: '42.640322, 74.635403',
              icon: {
                src: 'mapMarkers/camera-map-marker.svg',
                type: 'camera',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'IZqWhERkhiLUVTqC9hfi9',
              coordinates: '42.640554, 74.636638',
              icon: {
                src: 'mapMarkers/camera-map-marker.svg',
                type: 'camera',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'UGdkYn6RS2vFZbATSNSaX',
              coordinates: '42.640504, 74.637008',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: '5VzX8UHUe8okczQk5wITz',
              coordinates: '42.639958, 74.637612',
              icon: { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'jM5sMXBKpe0rmTIMNGdXr',
              coordinates: '42.64014, 74.64118',
              icon: { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
            {
              id: 'sUGRWazTiarFyz3T8NKgC',
              coordinates: '42.641409, 74.642463',
              icon: {
                src: 'mapMarkers/default-map-marker.svg',
                type: 'default',
              },
              title: '',
              strokeColor: '#3391fc',
            },
            {
              id: 'r1Rm4uegwFJiXtwI75dDF',
              coordinates: '42.642432, 74.643073',
              icon: {
                src: 'mapMarkers/hiking-map-marker.svg',
                type: 'hiking',
              },
              title: 'tour point',
              strokeColor: '#3391fc',
            },
          ],
        ],
      },
      {
        guides: [Andrey._id, Askar._id],
        name: 'Tour around the Osh city',
        mainImage: 'fixtures/osh.jpeg',
        description:
          'Osh tour will introduce you one of the most ancient cities of Central Asia and the second largest city in Kyrgyzstan. The main sight of Osh is the mountain "Solomon\'s Throne" that had been the second Mecca for local Muslims. Legends have endowed the mountain with the might able to heal any disease. There is a museum-reserve inside the mountain consisting of artificial and natural caves. Another sight worth a visit is Shaid Tepa, the largest mosque in Kyrgyzstan.',
        category: ['vacation', 'popular'],
        price: 6900,
        duration: 3,
        plan: [
          {
            title: 'From Bishkek to Osh',
            planDescription:
              'In the morning transfer to the airport in Bishkek to take a plane to Osh. Arrive in Osh and start the city tour. As legends say, Osh was founded by King Solomon ages ago and had an important position on trading routes of the Great Silk Road. Today you will visit Suleiman-Too (Solomon’s Mountain), museum, Osh bazaar – this market locates at the same place as in the times of Great Silk Road. Overnight in the guest house.',
          },
          {
            title: 'Exploring Osh',
            planDescription:
              'Whole day exploring Osh with our guide! Vizit best places, eat most tasty dishes etc.',
          },
          {
            title: 'From Osh back to Bishkek',
            planDescription:
              'Transfer to the airport (30 km). End of the tour.',
          },
        ],
        destination: 'Osh city',
        arrival: 'Akhunbaev st. 75',
        departure: '11 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
        galleryTour: ['fixtures/osh.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
      },
      {
        guides: [Andrey._id, Artem._id],
        name: 'Ancient Naryn town Tour',
        mainImage: 'fixtures/naryn.jpeg',
        description:
          'Naryn town is the administrative center of the Naryn Region. The town is situated on the banks of the Naryn River (the main headwaters of the Syr Darya). Naryn is the main path of the Great Silk Road, today it connects China, via Torugart Pass. The population of the Naryn Region is 99% Kyrgyz',
        category: ['history', 'popular'],
        price: 4500,
        duration: 2,
        plan: [
          {
            title: 'From Bishkek to Naryn',
            planDescription:
              'In the morning transfer to the Naryn city. Stay in the guesthouse, dinner.',
          },
          {
            title: 'Exploring Naryn',
            planDescription:
              'Whole morning exploring Naryn with our guide! After lunch, transfer back to Bishkek.',
          },
        ],
        destination: 'Naryn',
        arrival: 'Akhunbaev st. 75',
        departure: '11 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
        galleryTour: ['fixtures/sary-chelek.jpeg', 'fixtures/naryn.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
      },
      {
        guides: [Andrey._id, Artem._id],
        name: 'Amazing Tour to the Sary-Chelek',
        mainImage: 'fixtures/sary-chelek.jpeg',
        description:
          'Sary Chelek is located in the Jalal-Abad region in the west of Kyrgyzstan, tucked into the Western Tien Shan Mountains at the foot of the Chatkal Mountain Range. This alpine lake is the highlight of a larger area called Sary Chelek Nature Reserve which has been declared as a UNESCO Biosphere Reserve in 1978. The reserve has seven alpine lakes with Sary Chelek Lake being the largest one. Located at an altitude of 1887 meters and created by a landslide, the lake covers almost 500 hectares. The depth varies across the lake, with its deepest point at 245 meters.',
        category: ['on budget'],
        price: 8700,
        duration: 3,
        plan: [
          {
            title: 'From Bishkek to Jalal-Abad',
            planDescription:
              'At 8.00, meet your guide and driver. Start driving to Sary Chelek (from Bishkek - 685 km 10-12 hours). Arrival in Sary Chelek (Arkyt village) in the afternoon. Dinner and overnight in a home stay.',
          },
          {
            title: 'Free day in Sary-Chelek',
            planDescription:
              'Free day in Sary Chelek. After breakfast transfer from Arkyt village to Sary Chelek lake (15 km, 30 minutes). Picnic for lunch. Transfer back to Arkyt village. Dinner and overnight in a home stay.',
          },
          {
            title: 'From Jalal-Abad back to Bishkek',
            planDescription:
              'After breakfast transfer back to Bishkek. End of the tour.',
          },
        ],
        destination: 'Jalal-Abad, Sary-Chelek',
        arrival: 'Akhunbaev st. 75',
        departure: '11 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
        galleryTour: ['fixtures/sary-chelek.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
      },
      {
        guides: [Andrey._id, Artem._id],
        name: 'Fascinating Ala-Kul Tour',
        mainImage: 'fixtures/ala-kul.jpeg',
        description:
          'Ala Kul lake is located at an altitude of 3500 m, 20 kilometers south of the city of Karakol. The best time to visit Ala Kul lake is between early July and the end of September.  The trail to Ala Kul is well-marked, and you will find other hikers along during the hiking season, so you can hike to Ala Kul alone too.',
        category: ['history'],
        price: 3500,
        duration: 2,
        plan: [
          {
            title: 'From Bishkek to Karakol',
            planDescription:
              'In the morning you’ll be picked up from destination and go to Karakol. The trek starts from Karakol town. First, you need to get to the entrance of Karakol National Park. Then you need to walk along the old road toward the Sirota bridge for about 3 hours or 10 km. Here the difficult part of the trail begins. You need to walk through the forest up towards Ala Kul. The trail is clearly visible, you just need to follow the trail. After climbing for about + 500 m, you will arrive at the Sirota Camp. There is usually a tent camp in Sirota. You can overnight at the campsite if you don’t have a tent. ',
          },
          {
            title:
              'From Altyn Arashan to AkSuu - Karakol Town - back to Bishkek',
            planDescription:
              'On the second day you will goo to Aksuu, relax there, go to Karakol and back to Bishkek.',
          },
        ],
        destination: 'Karakol, Ala-Kul',
        arrival: 'Akhunbaev st. 75',
        departure: '11 PM',
        dressCode: 'Casual. Comfortable athletic clothing, hiking shoes.',
        included: ['Museum Tickets', 'Group Guide', 'Transport', 'Tents'],
        galleryTour: ['fixtures/ala-kul.jpeg'],
        country: 'Kyrgyzstan',
        isPublished: true,
      },
    );

  await TourReview.create(
    {
      user: user3._id,
      tour: Burana._id,
      comment: 'Nice tour!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Burana._id,
      comment: 'Love this tour!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Canyon._id,
      comment: 'Good one! I love it!',
      date: '2024-05-17T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: IssykKul._id,
      comment: 'Very beautiful place',
      date: '2024-07-09T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      comment: 'Amazing place, but it was cold!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: AlaKul._id,
      comment: 'Amazing place, love it',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: SaryChelek._id,
      comment: 'Very beautiful lake!!!',
      date: '2024-08-05T17:11:22.353Z',
    },
  );

  await Order.create(
    {
      user: user3._id,
      guide: Andrey._id,
      tour: Naryn._id,
      price: Naryn.price,
      date: '2023-11-08T11:22:03.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'booked',
    },
    {
      guide: Artem._id,
      tour: Osh._id,
      price: Osh.price,
      date: '2023-11-08T15:14:05.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'being considered',
      phone: '+996 707 777 404',
    },
    {
      user: user1._id,
      guide: Andrey._id,
      tour: Naryn._id,
      price: Naryn.price,
      date: '2023-11-08T11:22:03.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'approved',
    },
    {
      guide: Artem._id,
      tour: Osh._id,
      price: Osh.price,
      date: '2023-11-08T15:14:05.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'being considered',
      phone: '+996 707 777 404',
      email: 'brzzkv@gmail.com',
    },
  );

  await News.create(
    {
      title: '5 Amazing places in Issyk-Kul',
      description:
        'Located in the northeast of the country, Issyk-Kul borders with Kazakhstan on the northeast, with China on the southeast, with the Naryn region on the southwest, and with the Chuy region on the northwest. Within the borders of the Chui region, there is the famous Issyk-Kul lake that is one of the largest mountain lakes in the world which does not freeze even in the most severe winters. Issyk-Kul region is the most visited region of Kyrgyzstan where the main attraction of the region is Issyk-Kul Lake that is again one of the deepest and largest lakes in the world, located in the middle of the picturesque Tien Shan Mountains. Also in the Issyk-Kul region are the highest mountains of the country: the famous peak of Khan-Tengri and the highest point of Kyrgyzstan – the Pobeda Peak. That’s why Issyk-Kul is a pearl of Central Asia. But now it is time to find out some of the amazing places to visit in Issyk Kul. So, let get started. Here are the 5 Best Places to Visit in Issyk Kul: 1. Jeti Oguz Gorge, 2. Ak-Suu Gorge, 3. Tuz-Kol, 4. Ala-Kul Lake, 5. Sarychat-Eеrtash State Reserve',
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/issyk-kul.jpeg'],
      isPublished: true,
    },
    {
      title: 'Riding Horses in Ala-Archa: Personal Experience',
      description:
        'The horse is a national symbol of Kyrgyzstan and the animal is intrinsic to the country’s heritage. For thousands of years, the horse has bolstered life for Kyrgyz people and continues to do so. A known saying of the country is “every Kyrgyz man’s wings are his horse” and it’s said that Central Asians hunter-gatherers were the first to ride horses. These calm creatures have played a pivotal role in Kyrgyz agriculture, economy, defense and traditions. Even fermented horse milk is cherished – Westerners, make sure your stomach is as strong as steel before you dazzle your tastebuds… Kyrgyz people are expert horsemen and their national games champion their equestrian skills, such as Dead Goat Polo. Kyrgyzstan has a myriad of peaks, streams and prairie plains. Each region has its own throng of striking landscapes for you to delve into. Whenever I close my eyes and think of Kyrgyzstan, I’m transported to the image of a shepherd galloping across the plains with such care-free and vivacious spirit.',
      date: '2023-11-08T11:22:03.760Z',
      category: ['animals'],
      images: ['fixtures/ala-archa.jpeg'],
      isPublished: true,
    },
    {
      title:
        'How to get from Almaty to Bishkek by public transport in 2023: best way to cross the Kazakhstan – Kyrgyzstan border',
      description:
        'To take the bus from Almaty to Bishkek, you’ll have to go to the Sayran Bus Station in Almaty. This bus station is located 7km west of the city center so you’ll first have to take a city bus or a taxi to get there. There are daily 5 buses from Almaty to Bishkek, at 8:00, 10:00, 12:00, 14:00, and 18:00. One ticket costs 2500 KZT during weekdays and 2700 KZT on weekends. Once you arrive at the bus station, go inside the building and ask for the bus to Bishkek. People will show you the little office where you can purchase your ticket. Once you’ve got your ticket, go through the first door near the office and turn right. The bus to Bishkek is on platform 1, the very last one on your right-hand side. The ride to the border takes about 4 hours. The driver always takes a 10-minute break halfway through the journey at “Cafe Eurasia” where you can go to the toilet (50KZT or 5 KGS) and buy some snacks. There are several borders between Kazakhstan and Kyrgyzstan. When you take the bus from Almaty to Bishkek, you’ll cross at the Korday border, which is located about 21 km from the city center of Bishkek. Once you arrive at the border, you’ll have to get off the bus and take all your luggage with you. Take note of the license plate number so you can easily find your bus back on the Kyrgyz side of the border. The time it will take you to go through the border depends on how many people there are. If there are a lot of people, you’ll see long and disorganized queues and you might experience a lot of pushing and shoving.',
      date: '2023-11-08T11:22:03.760Z',
      category: ['borders'],
      images: ['fixtures/korday.jpeg'],
      isPublished: true,
    },
    {
      title: '3 beautiful lakes in Kyrgyzstan',
      description:
        'Over 1900 alpine lakes rest within Kyrgyzstan’s stunning mountain peaks, like hidden gemstones scattered throughout the country. The diverse Kyrgyzstan landscape makes every lake unique, with varying elevation, size, surrounding terrain and weather.It would be difficult to write about each and every one as some are so tiny that they wouldn’t even show on a map. So here is selected 3 of the most beautiful and best lakes in Kyrgyzstan that will help give you detailed info about each, facts and Kygyz myths and legends connected to these Kyrgyzstan lakes. 3 stunning lakes in Kyrgyzstan: Kel-Suu (Kel Suu, also known as Kol Tetiri, translates to ‘coming water’ in Kyrgyz and relates to the fact that sometimes the water in the lake comes and goes, leaking into connected caves. This fascinating feature creates a somewhat magical and mysterious atmosphere and helps make this one of the most beautiful Kyrgyzstan lakes.),  Song-Kol lak (Lake Son-Kul or Song-Köl’s name translates to ‘‘following lake’. Situated in the northern Naryn Province, this is Kyrgyzstan’s second-largest alpine lake and the country’s largest freshwater lake.), Kol-Ukok lake (The caravans of the Silk Road once passed here whilst traveling through the Torugart pass to Chinese Kashgar. Kol-Ukok in Kyrgyz translates to ‘lake in a chest’ and is located in the Naryn region in the North-Eastern Terskey Ala-Too mountain range.).',
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: [
        'fixtures/kel-suu.jpeg',
        'fixtures/son-kul.jpeg',
        'fixtures/kol-ukok.jpeg',
      ],
      isPublished: true,
    },
    {
      title: 'The best things to do in Kyrgyzstan',
      description:
        'Kyrgyzstan is wonderful place! Here are some best things to do in Kyrgyzstan. Staying in a yurt camp is one of the best and most unique things to do in Kyrgyzstan when you want to learn more about the Central Asian nomadic culture. Kyrgyzstan has the most accessible nomadic culture in Central Asia. Nowadays many Kyrgyz people live a semi-nomadic way of life. During the period between early June and late September, you’ll find many yurt camps all around the country. The art of felt-making has always played an important role in the lives of the Kyrgyz people. The secrets of this handicraft were handed down from generation to generation. The felt, made from lamb wool, was primarily used to cover and decorate the yurts but this material was also used to make carpets, bags, toys, and clothes.',
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/yurt.jpeg'],
      isPublished: true,
    },
    {
      title: 'What to wear hiking in Kyrgyzstan?',
      description:
        'Here’s the complete packing list for Kyrgyzstan (which can also be applied when traveling to Tajikistan and Kazakhstan. I also included some very important tips and advice that you need to take into consideration before you go trekking in the Central Asian mountains. When you go hiking for a few days in the remote Central Asian mountains, it’s crucial that you have the right trekking gear with you and that you pack wisely. To make sure you’re prepared and you don’t forget anything, I created a list of everything you need to pack and do when you’re planning on trekking in Central Asia. When it comes to packing for a trek, keep it as light as possible. Remember that you have to carry everything yourself and if you have ever done a 20 km hike that included climbing and ascending steep hills, you’ll know that there’s a big difference between carrying 10kg and hiking with 15kg on your back! The list: GPS, FISRT-AID KIT, SUNSCREEN, TENT, SLEEPING BAG, SPORT SHOES!',
      date: '2023-11-08T11:22:03.760Z',
      category: ['clothes'],
      images: ['fixtures/hiking.jpeg'],
      isPublished: true,
    },
    {
      title: 'Reasons why you should visit Kyrgyzstan?',
      description:
        'Kyrgyzstan is a country that captured our imagination from the very first time we entered its border from Kazakhstan. It has beautiful unspoiled mountains, crystal-clear mountain lakes,  a fascinating culture, and interesting traditions. We were amazed to see so many horses everywhere and that nomads are still living in yurts during the summer to follow the grazing of their cattle. Life in the countryside of Kyrgyzstan seemed so simple and quiet and this is something that immediately charmed us. When we first arrived in Kyrgyzstan, we still had the plan to hitchhike and sail around the whole world and we didn’t have the intention to stay in the country for very long. We had traveled all the way there on an overland journey from Europe and our goal was to reach South-East Asia as quickly as possible. After only three days in Kyrgyzstan, we decided we would be staying there for a while. What was just supposed to be a few months at first eventually became a whole year in this Central-Asian country. Now looking back, I’m so glad we took the decision to live and travel there for a longer time. There is an endless amount of things to do and plenty of beautiful places to discover in Kyrgyzstan. It’s a country where you can learn how to build yurts, walk around a fairy tale canyon and witness the perfect skills of eagle hunters. It’s also a very cheap destination and you can easily cross the border into Kazakhstan to renew your Kyrgyz visa. The nature of Kyrgyzstan has a wild untouched beauty that is rarely found anywhere else around the world. Reminiscing now this country where Cynthia and I lived and traveled for a year, it’s hard not to feel a certain nostalgia. I decided to write down the top reasons that made Kyrgyzstan so special to us and hopefully, this list will inspire you to visit the country one day as well.',
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/reasons.jpeg'],
      isPublished: true,
    },
  );

  await Employee.create(
    {
      name: 'Sarah',
      number: '+996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-1.jpeg',
    },
    {
      name: 'Pamela',
      number: '+996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-2.jpeg',
    },
    {
      name: 'Jessica',
      number: '996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-3.jpeg',
    },
  );

  await GuideReview.create(
    {
      user: user3._id,
      guide: Askar._id,
      comment: 'Good guide!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Andrey._id,
      comment: 'Pretty nice guide!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Artem._id,
      comment: 'Nice guide!',
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await PlatformReview.create(
    {
      user: user3._id,
      comment: 'Good!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      comment: 'Pretty nice!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      comment: 'Nice!',
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await TourRating.create(
    {
      user: user3._id,
      tour: Burana._id,
      rating: 5,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Burana._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Canyon._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      rating: 3,
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await GuideRating.create(
    {
      user: user3._id,
      guide: Askar._id,
      rating: 5,
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Andrey._id,
      rating: 5,
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Artem._id,
      rating: 4,
      date: '2024-08-05T17:11:22.353Z',
    },
  );

  await Partner.create(
    {
      image: 'fixtures/min-tour-logo.png',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Partner 2',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
    {
      name: 'Partner 3',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
    {
      name: 'Partner 4',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
  );

  await MainSlider.create(
    {
      country: 'Kyrgyzstan',
      image: 'fixtures/kyrgyzstan.jpeg',
    },
    {
      country: 'Kazakhstan',
      image: 'fixtures/kazakhstan.jpeg',
    },
    {
      country: 'Uzbekistan',
      image: 'fixtures/uzbekistan.jpeg',
    },
  );

  await ContactUs.create({
    image: 'fixtures/contacts.jpeg',
    title: 'Contact Us',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit.',
    contact: [
      {
        country: 'United States',
        address: '9 Valley St. Brooklyn, NY 11203',
        phone: '1-800-346-6277',
      },
      {
        country: 'Canada',
        address: '500 Kingston Rd Toronto ON M4L 1V3',
        phone: '1-800-346-6277',
      },
      {
        country: 'Australia',
        address: '60 Marcus Clarke St, Canberra, ACT 2601',
        phone: '1-800-346-6277',
      },
    ],
  });

  await AboutUs.create({
    main: {
      title: 'About',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit.',
      image: 'fixtures/about-us-bg.jpg',
    },
    offer: {
      title: 'Fastest Way to Book over 450 Great Tours',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'fixtures/horses.png',
    },
    posts: [
      {
        title: 'Save Money',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'fixtures/money-icon.svg',
      },
      {
        title: 'Get Support',
        description:
          'Lura, capio, et diatria. Mori recte ducunt ad alter plasmator. Experimentum sapienter ducunt ad audax.',
        image: 'fixtures/support-icon.svg',
      },
      {
        title: 'Travel Safety',
        description:
          'Indexs ortum! Classiss sunt solitudos de altus adgium. Castus, regius triticums superbe anhelare.',
        image: 'fixtures/safety-icon.svg',
      },
      {
        title: 'Book Easily',
        description:
          'Cur nixus mori? Pol. Sunt hippotoxotaes convertam festus, brevis buboes. Brevis terror nunquam amors.',
        image: 'fixtures/sun-icon.svg',
      },
    ],
    review: {
      title: 'What Clients Say About Us',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  });

  await GuideOrder.create(
    {
      user: user._id,
      name: 'Alex',
      surname: 'Walt',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
    {
      user: user._id,
      name: 'Arnold',
      surname: 'Skott',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
    {
      user: user._id,
      name: 'Murat',
      surname: 'Nasyrov',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
  );

  await PartnerOrder.create(
    {
      name: 'Sam',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
      image: 'fixtures/min-tour-logo.png',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Nam RM',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Felton',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
    },
  );
  await db.close();
};

run().catch(console.error);
