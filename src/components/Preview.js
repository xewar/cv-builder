import React, { Component } from 'react';
import uniqid from 'uniqid';

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
      skillsObj,
      jobsObj,
      degreesObj,
    } = this.props;
    const displaySkills = skillsObj.map(skill => {
      return (
        <div className="skill" key={uniqid()}>
          {skill.skill}
        </div>
      );
    });
    const displayJobs = jobsObj.map(job => {
      return (
        <div className="jobPreview" key={uniqid()}>
          <div className="jobTitle">{job.title}</div>
          <div className="organizationTitle">{job.organization}</div>
          <div className="jobStart">{job.start}</div>
          <div className="jobEnd">{job.end}</div>
          <div className="jobDescription">{job.description}</div>
        </div>
      );
    });
    const displayDegrees = degreesObj.map(degree => {
      return (
        <div className="degree" key={uniqid()}>
          <div className="degreeType">{degree.degreeType}</div>
          <div className="university">{degree.university}</div>
          <div className="degreeStart">{degree.start}</div>
          <div className="degreeEnd">{degree.end}</div>
        </div>
      );
    });
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
            <div className="skills">{displaySkills}</div>
            <div className="education">{displayDegrees}</div>
            <div className="work">{displayJobs}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
