// components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const Navbar = () => {
  const { t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '10px' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Home</Link>
      <Link to="/about" style={{ color: '#fff', marginRight: '10px' }}>{t("About")}</Link>
      <Link to="/login" style={{ color: '#fff',  marginRight: '10px' }}>{t("Login")}</Link>
      <Link to="/github" style={{ color: '#fff', marginRight: '10px' }}>Github</Link>
      <Link to="/weather" style={{ color: '#fff', marginRight: '10px' }}>weather</Link>
      <Link to="/stripe" style={{ color: '#fff', marginRight: '10px' }}>stripe</Link>
      <Link to="/employee" style={{ color: '#fff', marginRight: '10px' }}>employee</Link>
      <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('he')}>hindi</button>
    </div>
    </nav>
  );
};



export default Navbar;
