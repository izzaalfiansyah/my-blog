import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((it) => it.default),
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        inter: ["Inter:100..900"],
      },
    }),
  ],
});
