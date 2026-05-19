const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  images :{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default config;
