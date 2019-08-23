import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';
import Section from '../components/section';
import CoursesMap from '../components/courses-map';

import dash from '../utils/dash';

class Courses extends React.Component  {
  courses() {
    let edges = this.props.data.allMarkdownRemark.edges;
    return edges.map(edge => {
      let name = edge.node.frontmatter.name;
      let id = dash(name);
      let {latlong, address} = edge.node.frontmatter;
      let [latitude, longitude] = latlong.split(", ");

      return { id: id,
               name: name,
               latitude: parseFloat(latitude),
               longitude: parseFloat(longitude),
               address: address };
    });
  }
  render() {
    let courses = this.courses();
    if (courses.length) {
      let sections = courses.map(course => {
        return (
          <Section id={course.id} title={course.name} key={course.id}>
            <div className="course-address">
              <p>
                {course.address}
              </p>
            </div>
          </Section>
        );
      });
      return (
        <Layout title="Courses">
          <Header />
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-two-fifths">
                {sections}
              </div>
              <div className="column is-two-fifths">
                <CoursesMap courses={courses} />
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
}

export default Courses;

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
          latlong
          address
        }
      }
    }
  }
}
`;
