import React from 'react';

export default ({id, title, children}) =>
  <section id={id}>
    <div className="container">
      <div className="columns">
        <div className="column is-one-quarter">
          <h2 className="title">{title}</h2>
        </div>
        <div className="column section-main">
          {children}
        </div>
      </div>
    </div>
  </section>
