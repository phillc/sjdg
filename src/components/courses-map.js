import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { fitBounds } from 'google-map-react/utils';
import GoogleMapReact from 'google-map-react';


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
  renderLogo = () => {
    return (
      <StaticQuery
        query={graphql`
          query {
            logo: file(relativePath: { eq: "logo.png" }) {
              childImageSharp {
                fixed(width: 40) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <img src={data.logo.childImageSharp.fixed.src} className="course-pin-logo" alt="SJDG" />
          </>
        )}
      />
    );
  }
  render() {
    return (
      <div className='course-pin'
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}>
        {this.renderLogo()}
      </div>
    );
  }
}

class CoursesMap extends React.Component {
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

export default CoursesMap;
