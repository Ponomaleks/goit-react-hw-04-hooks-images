import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  card: { id, webformatURL, tags, largeImageURL },
  openModal,
}) {
  return (
    <li className={s.ImageGalleryItem} onClick={e => openModal(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
}
