import React from 'react';
import { graphql } from 'gatsby';
import GoogleMapReact from 'google-map-react';
// import { fitBounds } from 'google-map-react/utils';

import Layout from '../components/layout';
import Header from '../components/header';
import Section from '../components/section';

import dash from '../utils/dash';

class CoursePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hovering: false};

    // this.handleMouseEnter = this.handleMouseEnter.bind(this);
    // this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter = () => {
    this.setState({hovering: true});
  }
  handleMouseLeave = () => {
    this.setState({hovering: false});
  }
  render() {
    return (
      <div className='course-pin'
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}>
        {this.props.courseName}
      </div>
    );
  }
}

class CoursesMap extends React.Component {
  // TODO: fit bounds https://github.com/google-map-react/google-map-react/blob/HEAD/API.md
  static defaultProps = {
    center: {
      lat: 40.23,
      lng: -74.75
    },
    courses: [],
    zoom: 9
  };

  render() {
    const pins = this.props.courses
          .map(course => {
            const {id, name, latlong} = course;
            const [lat, lng] = latlong.split(", ");

            return (
              <CoursePin
                key={id}
                lat={lat}
                lng={lng}
                courseName={name} />
            );
          });

    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyAMIVHIB6dZ9DvmHUGZ75PexaJAsH52BiM' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {pins}
        </GoogleMapReact>
      </div>
    );
  }
};

class CourseMap extends React.Component  {
  render() {
    let edges = this.props.data.allMarkdownRemark.edges;
    if (edges.length) {
      let courses = edges.map(edge => {
        let name = edge.node.frontmatter.name;
        let id = dash(name);
        let latLong = edge.node.frontmatter.latlong;
        return { id: id, name: name, latlong: latLong };
      });
      let sections = courses.map(course => {
        console.log("?:", course)
        return (
          <Section id={course.id} title={course.name} key={course.id}>
            <div>{course.address}</div>
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

export default CourseMap;

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
