import type { ReactNode } from "react";
import type { Photo } from "@/content/types";
import PhotoImage from "./PhotoImage";

type PhotoFrameProps = {
  photo: Photo;
  className?: string;
  children?: ReactNode;
};

export default function PhotoFrame({
  photo,
  className = "",
  children,
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
        width={photo.width}
        height={photo.height}
        blurDataURL={photo.blurDataURL}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      {children}
    </figure>
  );
}