import {fileURLToPath, URL} from "node:url";

import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

// VitePluginHtmlEnv 能夠將環境變數注入到 index.html 中
import VitePluginHtmlEnv from "vite-plugin-html-env";

// Element Plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // Vite 默認情況下不加載..env.development 文件，使用導出的 loadEnv 來加載
    const env = loadEnv(mode, process.cwd(), "");
    return {
        /**
         * base: https://vitejs.dev/config/shared-options.html#base
         * 假設專案要部署在 https://xxxxxx/example/ 底下
         * 那麼 base 就應該設定為 '/example/'
         */
        base: env.VITE_BASE_PUBLIC_PATH,
        plugins: [
            vue(),
            VitePluginHtmlEnv(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ["vue", "vue-router", "pinia"],
                eslintrc: {
                    enabled: false,
                    filepath: "./.eslintrc-auto-import.json",
                    globalsPropValue: true,
                },
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: "sass",
                    }),
                ],
                types: [
                    {
                        from: "vue-router",
                        names: ["RouterLink", "RouterView"],
                    },
                ],
            }),
            VueDevTools(),
        ],
        resolve: {
            /**
             * alias: https://vitejs.dev/config/shared-options.html#resolve-alias
             * e.g. 會使用 "@" 來代表 src 資料夾
             */
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "/images": fileURLToPath(
                    new URL("./src/assets/images", import.meta.url)
                ),
                "/icons": fileURLToPath(new URL("./src/assets/icons", import.meta.url)),
            },
        },
        css: {
            preprocessorOptions: {
                /**
                 * scss: https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
                 * 在此設定全域共用的 scss 變數、mixin、function
                 */
                scss: {
                    additionalData: `
          `,
                },
            },
        },
        server: {
            // 監聽所有可用的網路介面
            host: "0.0.0.0",
            // 指定伺服器埠號，若被佔用時會自動使用其他埠號
            port: "4252",
            /**
             * proxy: https://vitejs.dev/config/server-options.html#server-proxy
             * dev 專用，在此設定後端 API 的代理，搭配環境變數使用
             */
            proxy: {
                "/gifs/api": {
                    target: env.VITE_APP_BACKEND_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/gifs\/api/, ""),
                },
            },
        },
    };
});
