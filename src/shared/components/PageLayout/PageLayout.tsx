import React, {FC} from 'react';
import {Layout} from 'antd';
import Header from '../Header';
import './styles.scss';

const PageLayout: FC = ({children}) => {
  return (
    <Layout className="layout">
      <Header />
      <Layout>
        <Layout.Content className="layout-content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
