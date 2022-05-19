import { useState, useEffect, useMemo } from 'react';
import '../index.css';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery';
import fetchPictures from '../services/pixabay-api';
import Button from './Button';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Modal from './Modal';

export function App() {
  const [pictures, setPictures] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largePicture, setLargePicture] = useState('');

  const openModal = e => {
    setShowModal(true);
    setLargePicture(e.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePictureSubmit = pictures => {
    setPictures(pictures);
    setPageNumber(1);
    setGallery([]);
  };

  useMemo(() => {
    if (!pictures) {
      return;
    }
    setLoading(true);
    setPageNumber(1);

    fetchPictures(pictures)
      .then(res => {
        if (res.length === 0) {
          toast.error('Please enter a valid request');
        }

        setGallery(res);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [pictures]);

  useEffect(() => {
    if (pageNumber === 1) {
      return;
    }
    setLoading(true);
    fetchPictures(pictures, pageNumber)
      .then(res => {
        setGallery(prevState => [...prevState, ...res]);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [pageNumber, pictures]);

  const loadMore = () => setPageNumber(PageNumber => PageNumber + 1);

  return (
    <div>
      <Searchbar onPictureSubmit={handlePictureSubmit} />
      {gallery.length !== 0 && (
        <ImageGallery gallery={gallery} handleModal={openModal} />
      )}
      {loading && <Loader />}
      {gallery.length !== 0 &&
        gallery[gallery.length - 1].hitsQuantity >= 12 && (
          <Button loadMore={loadMore} />
        )}
      {showModal && (
        <Modal onClose={closeModal} largePicuretoModal={largePicture} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}
