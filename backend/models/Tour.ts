import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  guides: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Guide',
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    kg: {
      type: String,
    },
    ru: {
      type: String,
    },
    en: {
      type: String,
    },
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  plan: {
    type: [
      {
        title: {
          kg: {
            type: String,
          },
          ru: {
            type: String,
          },
          en: {
            type: String,
          },
        },
        planDescription: {
          kg: {
            type: String,
          },
          ru: {
            type: String,
          },
          en: {
            type: String,
          },
        },
      },
    ],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
    required: true,
  },
  included: {
    type: [String],
    required: true,
  },
  galleryTour: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  routes: [],
});

const Tour = mongoose.model('Tour', TourSchema);
export default Tour;

// const Tour = mongoose.model('Tour', TourSchema);
// export default Tour;
//
// import mongoose from 'mongoose';
//
// const TourSchema = new mongoose.Schema({
//   guides: [
//     {
//       type: mongoose.Types.ObjectId,
//       ref: 'Guide',
//       required: true,
//     },
//   ],
//   name: {
//     kg: {
//       type: String,
//       required: true,
//     },
//     ru: {
//       type: String,
//       required: true,
//     },
//     en: {
//       type: String,
//       required: true,
//     },
//   },
//   mainImage: {
//     type: String,
//     required: true,
//   },
//   description: {
//     kg: {
//       type: String,
//       required: true,
//     },
//     ru: {
//       type: String,
//       required: true,
//     },
//     en: {
//       type: String,
//       required: true,
//     },
//   },
//
//   category: {
//     type: [String],
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   duration: {
//     type: Number,
//     required: true,
//   },
//   plan: {
//     type: [
//       {
//         title: {
//           kg: {
//             type: String,
//             required: true,
//           },
//           ru: {
//             type: String,
//             required: true,
//           },
//           en: {
//             type: String,
//             required: true,
//           },
//         },
//         planDescription: {
//           kg: {
//             type: String,
//             required: true,
//           },
//           ru: {
//             type: String,
//             required: true,
//           },
//           en: {
//             type: String,
//             required: true,
//           },
//         },
//       },
//     ],
//     required: true,
//   },
//   destination: {
//     type: String,
//     required: true,
//   },
//   arrival: {
//     type: String,
//     required: true,
//   },
//   departure: {
//     type: String,
//     required: true,
//   },
//   dressCode: {
//     type: String,
//     required: true,
//   },
//   included: {
//     type: [String],
//     required: true,
//   },
//   galleryTour: {
//     type: [String],
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   isPublished: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   routes: [],
// });
//
// const Tour = mongoose.model('Tour', TourSchema);
// export default Tour;
