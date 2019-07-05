import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import HeaderNavigation from './header-navigation';
import HeaderCarousel from './header-carousel';

const FullHeaderBody = () => {
  return (
    <div className="header-body hero-body">
      <div className="container has-text-centered">
        <StaticQuery
          query={graphql`
            query {
              logo: file(relativePath: { eq: "logo.png" }) {
                childImageSharp {
                  fixed(width: 400) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          `}
          render={data => (
            <>
              <img src={data.logo.childImageSharp.fixed.src} className="header-logo" alt="SJDG" />
              <div className="buttons is-centered">
                <a href="https://www.facebook.com/groups/256594737725049/" class="button">
                  <span class="icon is-large">
                    <i class="fab fa-lg fa-facebook-f"></i>
                  </span>
                  <span>Find us on Facebook</span>
                </a>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
};

const FullHeader = ({data}) => {
  return (
    <section className="hero header-container header-full is-fullheight">
      <HeaderNavigation />
      <FullHeaderBody />
      <HeaderCarousel />
    </section>
  );
};


const StandardHeader = ({ sections }) => {
  return (
    <section className="hero header-container header-short is-small">
      <HeaderNavigation />
      <HeaderCarousel />
    </section>
  );
};

export default StandardHeader;
export { FullHeader };
