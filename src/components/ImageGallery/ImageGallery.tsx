import { ImageItem } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: ImageItem[];
  openModal: (src: string, alt: string) => void;
}
const ImageGallery = ({ images, openModal }: ImageGalleryProps) => {
  return (
    <div>
      <ul className={css.galleryList}>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <ImageCard image={image} openModal={openModal} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
