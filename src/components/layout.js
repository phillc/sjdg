import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SEO from './seo'
import '../styles/all.scss'

const Layout = ({ title, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    // todo: home
    render={data => (
      <>
        <SEO title={title} keywords={[`jersey`, `disc`, `golf`]} />
        <div>
          {children}
          <footer>
            © 2019
          </footer>
        </div>
      </>
    )}
  />
)

export default Layout
