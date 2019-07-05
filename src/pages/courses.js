import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';
import Section from '../components/section';

const dash = (string) =>
      string.replace(/\s+/g, '-').toLowerCase();

export default ({data}) => {
  if (data.allMarkdownRemark.edges.length) {
    let edges = data.allMarkdownRemark.edges;
    let sections = edges.map(edge => {
      let sectionName = edge.node.frontmatter.name;
      let sectionId = dash(sectionName);
      return (
        <Section id={sectionId} title={sectionName} key={sectionId} >
          <div>asdf</div>
        </Section>
      );
    });
    return (
      <Layout title="Courses">
        <Header />
        {sections}
      </Layout>
    );
  } else {
    return (
      <Layout title="Courses">
        <Header />
        <p>Coming soon</p>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: {regex: "\/content\/courses/"},
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
          }
        }
      }
    }
  }
`;
