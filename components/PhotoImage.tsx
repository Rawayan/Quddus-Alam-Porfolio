import Image from "next/image";

type PhotoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
  className?: string;
};

export default function PhotoImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  blurDataURL,
  className = "",
}: PhotoImageProps) {
  const imageProps = blurDataURL
    ? {
        placeholder: "blur" as const,
        blurDataURL,
      }
    : {};

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        {...imageProps}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1000}
      priority={priority}
      sizes={sizes}
      className={className}
      {...imageProps}
    />
  );
}