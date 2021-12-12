import store from "../../store";

export default function ({ next }: any): void {
  if (store.getters["user/getToken"]) {
    return next({
      name: "Blogs",
    });
  }

  return next();
}
