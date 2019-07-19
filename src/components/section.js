import React from 'react';

export default ({id, title, children}) =>
  <section id={id} className='section-main container'>
    <h2 className="title">{title}</h2>
    {children}
  </section>
