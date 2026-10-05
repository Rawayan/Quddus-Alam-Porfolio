import PhotoImage from "./PhotoImage";

type HomeImageCardProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function HomeImageCard({
  src,
  alt,
  priority = false,
  className = ""
}: HomeImageCardProps) {
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
    >
      <PhotoImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="
          (max-width: 768px) 100vw,
          50vw
        "
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
          from-black/35
          via-transparent
          to-transparent
          opacity-70
        "
      />
    </div>
  );
}