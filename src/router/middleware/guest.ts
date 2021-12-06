// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookie from "js-cookie";

export default function ({ next }: any) {
  if (Cookie.get("jwt")) {
    return next({
      name: "Home",
    });
  }

  return next();
}
