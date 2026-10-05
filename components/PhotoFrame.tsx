import PhotoImage from "./PhotoImage";

type PhotoFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  priority?: boolean;
  className?: string;
};

export default function PhotoFrame({
  src,
  alt,
  width,
  height,
  blurDataURL,
  priority = false,
  className = ""
}: PhotoFrameProps) {
  return (
    <div
      className={`
        glass
        glass-card
        group
        relative
        overflow-hidden
        ${className}
      `}
      style={{
        aspectRatio: `${width} / ${height}`
      }}
    >
      <PhotoImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        blurDataURL={blurDataURL}
        className="
          object-cover
          transition
          duration-700
          ease-out
          group-hover:scale-[1.03]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/30
          via-transparent
          to-transparent
          opacity-70
        "
      />
    </div>
  );
}