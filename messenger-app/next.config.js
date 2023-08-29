/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    plugins: [
      ['next-superjson-plugin', {}],
      // Other plugins...
    ],
  };
  
  module.exports = nextConfig;

// next-superjson: sanitises our objects so we can safley pass them, even tho they have date objects and other complex properties
// properties that are not compatable when passing from server components like sidebar into a client component like desktopsidebar for example.
