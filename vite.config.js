import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    sveltekit(),
    VitePWA({
      registerType: "autoUpdate", // Mantém a atualização automática do service worker
      workbox: {
        // Define os arquivos a serem armazenados em cache
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        // Configura a estratégia Cache First para os recursos
        runtimeCaching: [
          {
            // Cache para recursos estáticos (JS, CSS, imagens, etc.)
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100, // Limite de itens no cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
              },
            },
          },
          {
            // Cache para páginas HTML (Cache First com fallback para rede)
            urlPattern: ({ request }) => request.destination === "document",
            handler: "CacheFirst",
            options: {
              cacheName: "html-pages",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
              },
            },
          },
          {
            // Cache para APIs ou outros recursos dinâmicos (opcional, se você tiver APIs)
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst", // Prioriza a rede para APIs, com cache como fallback
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10, // Timeout de 10 segundos antes de usar o cache
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 dia
              },
            },
          },
        ],
      },
      manifest: {
        name: "Meu App",
        short_name: "MeuApp",
        description: "Meu App PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable", // Ícone adaptável para Android
          },
        ],
      },
    }),
  ],
});
