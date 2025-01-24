import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

interface ImageGridProps {
  images: [{
    id: string;
    src: string;
    altText: string;
  }]
};

const ImageGrid = ({ images }: ImageGridProps) => {
  console.log('ImageGrid', images)
  return (
    <div className={`m-auto grid grid-cols-1 md:grid-cols-2 gap-1`}>
      {images.map((image, index) => {
        const imageUrl = urlForImage(image)?.height(1000).width(2000).url() as string;
        return (
          <a target="_blank" href={imageUrl} rel="noreferrer noopener">
            <Image
              key={`${index}-${image?.id}`}
              src={imageUrl}
              width={500}
              height={500}
              alt={image.altText}
              className="rounded-lg shadow-md overflow-hidden"
            />
        </a>
      )})}
    </div>
  );
};

export default ImageGrid;
