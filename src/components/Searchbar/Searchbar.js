import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onPictureSubmit }) {
  const [pictures, setPictures] = useState('');

  const handleSearchRequest = event => {
    setPictures(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (pictures.trim() === '') {
      toast.error('Please enter a search request');
      return;
    }

    onPictureSubmit(pictures);
    setPictures('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button className={s.button} type="submit">
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictures}
          onChange={handleSearchRequest}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onPictureSubmit: PropTypes.func,
};
