import React from 'react';
import { graphql } from 'gatsby';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Layout from '../components/layout';
import Header from '../components/header';
import Section from '../components/section';

import dash from '../utils/dash';

class CoursePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hovering: false};
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

  constructor(props) {
    super(props);
    this.state = {};
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    let { clientHeight, clientWidth } = this.mapRef.current;
    this.setState({ height: clientHeight, width: clientWidth });
  }

  calculateSize() {
    const lats = this.props.courses.map(course => course.latitude);
    const longs = this.props.courses.map(course => course.longitude);
    const northLat = Math.max(...lats);
    const southLat = Math.min(...lats);
    const eastLong = Math.max(...longs);
    const westLong = Math.min(...longs);

    const bounds = {
      nw: {
        lat: northLat,
        lng: westLong
      },
      se: {
        lat: southLat,
        lng: eastLong
      }
    };
    let size = { width: (this.state.width || 600), height: (this.state.height || 400) };
    return fitBounds(bounds, size);
  }

  renderMap = () => {
    if (this.state.height && this.state.width) {
      let {center, zoom} = this.calculateSize();
      const pins = this.props.courses
            .map(course => {
              const {id, name, latitude, longitude} = course;
              return (
                <CoursePin
                  key={id}
                  lat={latitude}
                  lng={longitude}
                  courseName={name} />
              );
            });

      return (
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyAMIVHIB6dZ9DvmHUGZ75PexaJAsH52BiM' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {pins}
        </GoogleMapReact>
      );

    } else {
      return null;
    }
  }

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }} ref={this.mapRef}>
        {this.renderMap()}
      </div>
    );
  }
};

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
