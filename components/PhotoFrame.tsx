import type { ReactNode } from "react";
import type { Photo } from "@/content/types";
import PhotoImage from "./PhotoImage";

type PhotoFrameProps = {
  photo: Photo;
  className?: string;
  children?: ReactNode;
  sizes?: string;
};

export default function PhotoFrame({
  photo,
  className = "",
  children,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: PhotoFrameProps) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[var(--radius-lg)] ${className}`}
      style={{
        aspectRatio: `${photo.width} / ${photo.height}`,
      }}
    >
      <PhotoImage
        src={photo.src}
        alt={photo.alt.en}
        fill
        sizes={sizes}
        blurDataURL={photo.blurDataURL}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      {children}
    </figure>
  );
}