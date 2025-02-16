import {createRouter, createWebHistory} from "vue-router";
import {storeToRefs} from "pinia";
import {showMessage} from "@/utils/element-plus";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // 走到未定義的路徑時，導回首頁
            path: "/:pathMatch(.*)",
            redirect: "/",
        },
        {
            path: "/",
            name: "SurveyForm",
            component: () => import("../views/SurveyForm.vue"),
        },
    ],
});


export default router;
