import H2 from "../text/H2";
import ImageGallery from "./ImageGallery";

export default function GalleryShowcase() {
  const images = [
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      alt: "image",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      alt: "image 1",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      alt: "image 2",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      alt: "image 3",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      alt: "image 4",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      alt: "image 5",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      alt: "image 6",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      alt: "image 7",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      alt: "image 8",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      alt: "image 9",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      alt: "image 10",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      alt: "image 11",
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full gap-sub-large">
        <H2 type="laptop-large:heading--extra-large heading--large">
          Image gallery
        </H2>
        <ImageGallery
          images={images}
          divsDimension="h-auto max-w-full"
          sizes="(laptopL) 24vw,
                    (tablet) 45vw,
                    100vw"
          imageDimension={400}
          grid="grid grid-cols-2 laptop:grid-cols-4 w-full"
          gridAmount={3}
          rounded="rounded-extra-small"
          gap="gap-extra-small"
        ></ImageGallery>
      </div>
    </div>
  );
}
