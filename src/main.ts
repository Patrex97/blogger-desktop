import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/styles.scss";

const app = createApp(App);
axios.defaults.withCredentials = true;

app.config.performance = true;
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
