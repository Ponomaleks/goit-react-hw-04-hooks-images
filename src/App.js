import './App.css';
import { useState, useEffect } from 'react';

import Searchbar from './Components/Searchbar/Searchbar';
import API from './Servises/API';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import LoaderEl from './Components/Loader';
import Modal from './Components/Modal/Modal';

const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [req, setReq] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('mount');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const [notLastPage, setNotLastPage] = useState(true);

  const handleSubmit = request => {
    if (req !== request) {
      setImages([]);
      setReq(request);
      setPage(1);
    }
  };

  useEffect(() => {
    if (status === 'mount') {
      setStatus(statuses.IDLE);
      return;
    }

    setStatus(statuses.PENDING);
    API(req, page).then(([data, status]) => {
      setImages([...images, ...data.hits]);
      if (images.length === data.totalHits) {
        setNotLastPage(false);
      }
      console.log(notLastPage);
      setStatus(status);
      if (page > 1) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req, page]);

  function togleModal(webformatURL, tags) {
    setShowModal(!showModal);
    setModalImg({ img: webformatURL, descr: tags });
  }

  let loadMore;
  if (images.length >= 12) {
    loadMore = true;
  } else loadMore = false;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {status === statuses.RESOLVED && <ImageGallery cards={images} openModal={togleModal} />}
      {status === statuses.PENDING && <LoaderEl />}
      {status === statuses.REJECTED && <h2>Something went wrong. Please try again</h2>}
      {loadMore && notLastPage && (
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
        />
      )}
      {showModal && (
        <Modal img={modalImg.img} description={modalImg.descr} closeModal={togleModal} />
      )}
    </div>
  );
}
