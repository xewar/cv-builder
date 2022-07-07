import React, { Component } from 'react';
import Editor from './Editor';

class Preview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      about,
      firstName,
      lastName,
      twitter,
      email,
      website,
      city,
      mobile,
      skillsList,
    } = this.props;
    return (
      <div className="cvPreview">
        <div className="paper">
          <div></div>
          <div className="personal">
            <div className="name">
              {firstName} {lastName}
            </div>
            <div className="title">{title}</div>
            <div className="about"> {about}</div>
            <div className="twitter">{twitter}</div>
            <div className="website">{website}</div>
            <div className="email">{email}</div>
            <div className="mobile">{mobile}</div>
            <div className="city">{city}</div>
            <div className="skills">{skillsList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
