import React from 'react';
import PropTypes from 'prop-types';
import './HomeButton.css';

function HomeButton({ linkref, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(linkref); // Invoke onClick callback with linkref
    }
  };

  return (
    <div>
      <button className="cssbuttons-io-button" onClick={handleClick}>
        Get started
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
}

HomeButton.propTypes = {
  linkref: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // onClick callback is required
};

export default HomeButton;
