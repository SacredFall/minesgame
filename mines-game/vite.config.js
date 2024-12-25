import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "mines-game/mines.html", // Adjust paths based on your project structure
      },
    },
  },
});
