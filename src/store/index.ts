import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import { user } from "@/store/user";

export default createStore({
  modules: { user },
});
