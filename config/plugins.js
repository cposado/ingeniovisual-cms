module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },

});

// module.exports = ({ env }) => {
//   // Adapt config based on environment
//   const environment = env('NODE_ENV');

//   // Use Cloudinary in production
//   if (environment === 'production') {
//     return {
//       upload: {
//         provider: 'cloudinary',
//         providerOptions: {
//           cloud_name: env('CLOUDINARY_NAME'),
//           api_key: env('CLOUDINARY_KEY'),
//           api_secret: env('CLOUDINARY_SECRET'),
//         },
//       },
//     }
//   }

// };
