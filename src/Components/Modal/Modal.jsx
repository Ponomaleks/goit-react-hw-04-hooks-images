import { useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ img, description, closeModal }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const handleByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleByBackdropClick}>
      <div className={s.Modal}>
        <img src={img} alt={description} />
      </div>
    </div>
  );
}
