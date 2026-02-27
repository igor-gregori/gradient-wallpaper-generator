import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/gradient-wallpaper-generator/",
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
