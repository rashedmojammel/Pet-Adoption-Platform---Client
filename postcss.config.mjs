const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  images :{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default config;
