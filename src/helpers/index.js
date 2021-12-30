export function getImagePath(image) {
  if (typeof image === "string") return image;
  if (image.isLoaded) {
    if (image.tempName) {
      return image.file.path;
    }
    if (image.externalName) {
      return image.externalName;
    }
  }
}
