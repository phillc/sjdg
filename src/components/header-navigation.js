import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Link } from 'gatsby';
import classNames from'classnames';

const NavBarLink = ({to, children}) => {
  return (
    <Link
      to={to}
      className="header-link navbar-item"
      activeClassName="header-link-active">
      {children}
    </Link>
  );
};



export default class HeaderNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { burgerActive: false };

    this.handleBurgerClick = this.handleBurgerClick.bind(this);
  }

  handleBurgerClick() {
    this.setState(state => ({
      burgerActive: !state.burgerActive
    }));
  }

  render() {
    return (
      <div className="header-navigation hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <StaticQuery
                  query={graphql`
                  query {
                    logo: file(relativePath: { eq: "logo.png" }) {
                      childImageSharp {
                        fixed(height: 100) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                `}
                  render={data => (
                    <img src={data.logo.childImageSharp.fixed.src} className="header-navigation-logo" alt="SJDG" />
                  )}
                />
                <h1>South Jersey Disc Golf</h1>
              </Link>
              <span className={classNames("navbar-burger burger", { "is-active": this.state.burgerActive })} onClick={this.handleBurgerClick}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div className={classNames("navbar-menu", { "is-active": this.state.burgerActive })}>
              <div className="navbar-end">
                <NavBarLink to="/">Home</NavBarLink>
                {/*<NavBarLink to="/about">About</NavBarLink>*/}
                <NavBarLink to="/courses">Courses</NavBarLink>
                {/*<NavBarLink to="/events">Events</NavBarLink>*/}
                {/*<NavBarLink to="/contact">Contact</NavBarLink>*/}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  };
}
