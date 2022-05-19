import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largePicuretoModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  });

  const closeModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handlBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handlBackdropClick}>
      <div className={s.modal}>
        <img src={largePicuretoModal} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largePicuretoModal: PropTypes.string.isRequired,
};
