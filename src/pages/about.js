import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Header from '../components/header'
import Section from '../components/section'

class About extends React.Component {
  aboutSections() {
    const edges = this.props.data.allMarkdownRemark.edges
    return edges.map(edge => {
      return { name: edge.node.frontmatter.name,
               html: edge.node.html,
               bodyPdf: edge.node.frontmatter.body_pdf }
    });
  }

  render() {
    const aboutSections = this.aboutSections();
    if (aboutSections.length) {
      let sections = aboutSections.map(aboutSection => {
        let download = '';
        let bodyPdf = aboutSection.bodyPdf;
        if (bodyPdf) {
          download = (
            <p>
              <a href={bodyPdf} className="button is-primary">Download PDF</a>
            </p>
          );
        }
        return (
          <Section id={aboutSection.id} title={aboutSection.name} key={aboutSection.id}>
            <div dangerouslySetInnerHTML={{ __html: aboutSection.html }}></div>
            {download}
          </Section>
        );
      });
      return (
        <Layout title="About">
          <Header />
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                {sections}
              </div>
            </div>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout title="About">
          <Header />
          <p>Coming soon</p>
        </Layout>
      )
    }
	}
}
export default About;

export const pageQuery = graphql`
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: {regex: "\/content\/about/"},
								frontmatter: { public: { eq: true } } },
			sort: { order: ASC, fields: [frontmatter___sort]}
		) {
			edges {
				node {
					id
					html
					frontmatter {
						sort
						name
						public
            body_pdf
					}
				}
			}
		}
	}
`
