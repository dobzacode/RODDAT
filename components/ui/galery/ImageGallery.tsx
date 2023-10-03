import { randomUUID } from "crypto";
import ImageDiv from "../div/ImageDiv";

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageProps[];
  divsDimension: string;
  sizes: string;
  imageDimension: number;
  grid: string;
  gridAmount: number;
  rounded?: string;
  gap?: string;
}

export default function ImageGallery({
  images,
  gridAmount,
  grid,
  imageDimension,
  sizes,
  divsDimension,
  rounded,
  gap,
}: ImageGalleryProps) {
  const chunkArray = (arr: ImageProps[], chunkSize: number) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const imageChunks = chunkArray(images, gridAmount);

  return (
    <div className={`${grid} ${gap}`}>
      {imageChunks.map((chunk, index) => (
        <div key={index} className={`grid ${gap} ${divsDimension}`}>
          {chunk.map((image, i) => (
            <ImageDiv
              rounded={rounded}
              sizes={sizes}
              divDimension={divsDimension}
              imageWidth={imageDimension}
              imageHeight={imageDimension}
              key={randomUUID()}
              src={image.src}
              alt={image.alt}
            ></ImageDiv>
          ))}
        </div>
      ))}
    </div>
  );
}
