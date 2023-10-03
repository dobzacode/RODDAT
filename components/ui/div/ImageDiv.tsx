import Image from "next/image";

interface DivImageProps {
  src: string;
  sizes: string;
  alt: string;
  divDimension: string;
  imageWidth: number;
  imageHeight: number;
  rounded?: string;
  fill?: boolean;
}

export default function ImageDiv({
  sizes,
  src,
  alt,
  divDimension,
  imageWidth,
  imageHeight,
  fill,
  rounded,
}: DivImageProps) {
  return (
    <div className={`${fill ? "relative" : ""} ${divDimension} ${rounded}`}>
      <Image
        fill={fill}
        sizes={sizes}
        width={imageWidth}
        height={imageHeight}
        src={src}
        alt={alt}
        className={`${rounded}`}
        style={{ objectFit: "cover" }}
      ></Image>
    </div>
  );
}
