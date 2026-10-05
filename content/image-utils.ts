import {Photo} from "./types";

export function getPhotoAspectRatio(
  photo: Photo
): string {
  return `${photo.width} / ${photo.height}`;
}

export function getPhotoSizes(): string {
  return `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `;
}