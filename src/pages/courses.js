import React from 'react';
import { graphql } from 'gatsby';
import GoogleMapReact from 'google-map-react';

import Layout from '../components/layout';
import Header from '../components/header';
import Section from '../components/section';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class CoursesMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.23,
      lng: -74.75
    },
    zoom: 7
  };

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyAMIVHIB6dZ9DvmHUGZ75PexaJAsH52BiM' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent */}
          {/*   lat={59.955413} */}
          {/*   lng={30.337844} */}
          {/*   text="My Marker" */}
          {/* /> */}
        </GoogleMapReact>
      </div>
    );
  }
}


const dash = (string) =>
      string.replace(/\s+/g, '-').toLowerCase();

export default ({data}) => {
  if (data.allMarkdownRemark.edges.length) {
    let edges = data.allMarkdownRemark.edges;
    let sections = edges.map(edge => {
      let sectionName = edge.node.frontmatter.name;
      let sectionId = dash(sectionName);
      return (
        <Section id={sectionId} title={sectionName} key={sectionId}>
          <div>asdf</div>
        </Section>
      );
    });
    return (
      <Layout title="Courses">
        <Header />
        <div className="container">
          <div className="columns">
            <div className="column">
              {sections}
            </div>
            <div className="column is-two-fifths">
              <CoursesMap />
            </div>
          </div>
        </div>
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
