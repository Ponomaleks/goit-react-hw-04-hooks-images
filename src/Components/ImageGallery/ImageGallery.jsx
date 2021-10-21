import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ cards, openModal }) {
  return (
    <ul className={s.ImageGallery}>
      {cards.map(card => {
        return <ImageGalleryItem card={card} key={card.id} openModal={openModal} />;
      })}
    </ul>
  );
}
