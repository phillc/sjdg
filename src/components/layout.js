import React from 'react';

import SEO from './seo';
import '../styles/all.scss';
import dash from '../utils/dash';


const Layout = ({ title, children }) => {
  const className = dash(title) + '-page';
  return (
    <div className={className}>
      <SEO title={title} keywords={[`jersey`, `disc`, `golf`]} />
      {children}
    </div>
  );
};

export default Layout;
