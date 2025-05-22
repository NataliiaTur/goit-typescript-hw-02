import { ImageItem } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: ImageItem;
  openModal: (src: string, alt: string) => void;
}

const ImageCard = ({ image, openModal }: ImageCardProps) => {
  const { urlSm, likes, alt, urlReg } = image;
  return (
    <div className={css.imageCard}>
      <img src={urlSm} alt={alt} onClick={() => openModal(urlReg, alt)} />
      <p>❤️Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
