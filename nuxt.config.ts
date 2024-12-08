import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  // (optional) Enable the Nuxt devtools
  devtools: { enabled: true },

  // Enable SSG
  ssr: false,

  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: {
    host: process.env.TAURI_DEV_HOST || "localhost",
    port: 8080,
  },

  css: [
    "./assets/css/main.css",
    "vue-waterfall-plugin-next/dist/style.css",
  ],

  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
    },

    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
        dts: true,
      }),
      Components({ dts: true, resolvers: [NaiveUiResolver()] }),
    ],
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxtjs-naive-ui",
    "@vueuse/nuxt",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  nitro: {
    output: {
      publicDir: "dist",
    },
  },
});
