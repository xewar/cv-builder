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
        <div className="degreePreview" key={uniqid()}>
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
            <div className="skills">
              {/* section title only displayed if there is something filled out */}
              {skillsObj[0].skill && <div className="sectionTitle">Skills</div>}
              <div>{displaySkills}</div>
            </div>
            <div className="education">
              {degreesObj[0].university && (
                <div className="sectionTitle">Education</div>
              )}
              <div>{displayDegrees}</div>
            </div>
            <div className="work">
              {jobsObj[0].title && (
                <div className="sectionTitle">Experience</div>
              )}
              <div> {displayJobs}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
