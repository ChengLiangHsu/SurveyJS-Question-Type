import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {surveyPlugin} from "survey-vue3-ui";
import "survey-core/defaultV2.min.css";

import QuestionGcs from "./components/Question-GCS.vue";
import QuestionCustom from "./components/QuestionCustom.vue";


const app = createApp(App);
app.use(router);
app.use(surveyPlugin);
app.component("survey-gcs_custom_question", QuestionGcs)
app.component("survey-custom-question", QuestionCustom)
app.mount("#app");
