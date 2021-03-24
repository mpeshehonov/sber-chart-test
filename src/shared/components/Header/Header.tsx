import React from 'react';
import {Layout} from 'antd';
import './styles.scss';
import {Link} from 'react-router-dom';


const Header = () => {

  return (
    <Layout.Header className="header">
      <Link to="/" className="header__logo">
        Сбер
      </Link>
    </Layout.Header>
  );
};

export default Header;
