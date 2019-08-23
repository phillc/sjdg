import React from 'react';

export default ({id, title, children}) =>
  <section id={id} className='section section-main container'>
    <h1 className="title">{title}</h1>
    {children}
  </section>
