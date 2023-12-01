export default {
  head: {
    title: "test-task-Involta",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["@/assets/app.css"],

  plugins: [],

  components: true,

  buildModules: [],

  modules: [],
  serverMiddleware: [
    { path: "/api/mos-rss", handler: "~/api/mos-rss.js" },
    { path: "/api/lenta-rss", handler: "~/api/lenta-rss.js" },
  ],

  build: {},
};
