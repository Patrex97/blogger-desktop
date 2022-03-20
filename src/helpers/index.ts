import { ContentType } from "../interfaces/contentType";
import { Image } from "../interfaces";

export function getImagePath(image: string | Image): string {
  if (typeof image === "string") {
    return image.startsWith("http") ? image : `http://localhost:3000/post/file`;
  }
  if (image.isLoaded) {
    if (image.tempName && image.file) {
      return image.file.path;
    }
    if (image.externalName) {
      return image.externalName;
    }
  }
  return "";
}

export function getComponentName(componentName: ContentType): string {
  if (componentName === ContentType.Text) {
    return "Editor";
  }
  if (componentName === ContentType.Image) {
    return "File";
  }
  return "";
}
