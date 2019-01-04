import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Carousel from 'nuka-carousel';
import Img from "gatsby-image"

const HeaderCarousel = () => {
  return <div>
    <div className="header-carousel-overlay" />
    <div className="header-carousel">
      <StaticQuery
        query={graphql`
          query {
            images: allFile(sort: {fields: [name], order: ASC}, filter: { relativeDirectory: {eq: "front"} }) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 1280) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <Carousel
            autoplay={true}
            autoplayInterval={10000}
            pauseOnHover={false}
            withoutControls={true}
            wrapAround={true}
            autoGenerateStyleTag={false}
            slideIndex={0}
          >
            {data.images.edges.map((edge, i) =>
              <Img key={i} fluid={edge.node.childImageSharp.fluid} style={{height: "100vh"}} />
            )}
          </Carousel>
        )}
      />
    </div>
  </div>
}
export default HeaderCarousel
