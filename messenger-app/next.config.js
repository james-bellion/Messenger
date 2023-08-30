// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       appDir: true,
//     },
//     plugins: [
//       ['next-superjson-plugin', {}],
//       // Other plugins...
//     ],
//     images: {
//       domains: [
//         "res.cloudinary.com",
//         "avatars.githubusercontent.com",
//         "lh3.googleusercontent.com"
//       ]
//     }
//   };

//   module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//     swcPlugins: [["next-superjson-plugin", {}]]
//   },
//   images: {
//     domains: [
//       'res.cloudinary.com',
//       'avatars.githubusercontent.com',
//       'lh3.googleusercontent.com'
//     ]
//   }
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: [
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;

// next-superjson: sanitises our objects so we can safley pass them, even tho they have date objects and other complex properties
// properties that are not compatable when passing from server components like sidebar into a client component like desktopsidebar for example.

// added images domains to get user images from their social accounts

// domain to add? res.cloudinary.com instead of pbs.twimg.com
