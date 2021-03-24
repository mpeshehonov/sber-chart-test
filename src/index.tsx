import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './pages/routes';
import PageLayout from './shared/components/PageLayout';
import 'antd/dist/antd.css';
import './styles.scss';

ReactDOM.render(
  <Router>
    <PageLayout>
      <Routes />
    </PageLayout>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
