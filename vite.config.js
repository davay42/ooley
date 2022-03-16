import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";
import { generatePages } from "./.vitepress/pages";



export default defineConfig({
  server: {
    port: 3342,
  },
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: ["vue"],
    }),
    Pages(generatePages({
      hostname: 'https://ooley.ru/',
      dirs: [
        { dir: "post", baseRoute: "post" },
        { dir: "event", baseRoute: "event" },
        { dir: "theory", baseRoute: "theory" },
        { dir: "overview", baseRoute: "overview" },
        { dir: "report", baseRoute: "report" },
        { dir: "workshop", baseRoute: "workshop" },
        { dir: "practice", baseRoute: "practice" },
        { dir: "research", baseRoute: "research" },
        { dir: "contact", baseRoute: "contact" },
      ],
    })),
    Components({
      dirs: [".vitepress/theme/components", ".vitepress/comps"],
      extensions: ["vue", "ts"],
      directoryAsNamespace: true,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),
    Icons({
      defaultStyle: "vertical-align: middle;",
    }),
    WindiCSS({
      scan: {
        dirs: [".vitepress"],
        include: ["index.md"],
        exclude: ["**/examples/**/*"],
        fileExtensions: ["vue", "ts"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
  },
  ssr: {
    noExternal: ["ol"],
  },
});
