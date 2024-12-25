import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        mines: "src/mines.html",
        chime: "src/chime.mp3",
        boom: "src/boom.mp3",
        gem: "src/gem.svg",
        bomg: "src/bomb.svg",
        cashout: "src/cashout.wav",
      },
    },
  },
});
