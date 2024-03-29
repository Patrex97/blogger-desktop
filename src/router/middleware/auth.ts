// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookie from "js-cookie";
import store from "../../store";

export default function ({ next }: any) {
  if (!store.getters["user/getToken"]) {
    return next({
      name: "Login",
    });
  } else {
    store.dispatch("user/fetchUserData");
  }

  return next();
}
