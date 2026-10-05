import Image from "next/image";

type PhotoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  blurDataURL?: string;
};

export default function PhotoImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = "",
  blurDataURL
}: PhotoImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={
          blurDataURL
            ? "blur"
            : "empty"
        }
        blurDataURL={blurDataURL}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1067}
      priority={priority}
      placeholder={
        blurDataURL
          ? "blur"
          : "empty"
      }
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}