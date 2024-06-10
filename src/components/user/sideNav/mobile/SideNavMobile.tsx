import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-around">
      <a href="/" className="text-white">
        <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
      </a>
      <a href="/likes" className="text-white">
        <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
      </a>
      <a href="/notifications" className="text-white">
        <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
      </a>
      <a href="/messages" className="text-white">
        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
      </a>
      <a href="/profile" className="text-white">
        <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
      </a>
    </nav>
  );
};

export default NavigationBar;
