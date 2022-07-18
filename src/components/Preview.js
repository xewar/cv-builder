import React from 'react';
import uniqid from 'uniqid';

const Preview = props => {
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
    honorsObj,
  } = props;
  const displaySkills = skillsObj.map(skill => {
    return (
      <div className="skill" key={uniqid()}>
        {skill.skill}
      </div>
    );
  });
  const displayHonors = honorsObj.map(honor => {
    return (
      <div className="honor" key={uniqid()}>
        {honor.honor}, {honor.year}
      </div>
    );
  });
  const displayJobs = jobsObj.map(job => {
    return (
      <div className="jobPreview" key={uniqid()}>
        <div className="jobsTop">
          <div className="jobTitle">{job.title}</div>
          <div className="jobDates">
            {job.start} - {job.end}
          </div>
        </div>
        <div className="organizationTitle">{job.organization}</div>

        <div className="jobDescription">{job.description}</div>
      </div>
    );
  });
  const displayDegrees = degreesObj.map(degree => {
    return (
      <div className="degreePreview" key={uniqid()}>
        <div className="degreeTop">
          <div className="university">{degree.university}</div>
          <div className="degreeDates">
            {degree.start} - {degree.end}
          </div>
        </div>
        <div className="degreeType">{degree.degreeType}</div>
      </div>
    );
  });
  return (
    <div className="cvPreview">
      <div className="paper">
        <div className="cvText">
          <div className="cvLeft">
            <div className="topLeft">
              <div className="name">
                {firstName} {lastName}
              </div>
              <div className="about"> {about}</div>
            </div>
            <div className="cvBottomLeft">
              <div className="contact">
                <div className="twitter">{twitter}</div>
                <div className="website">{website}</div>
                <div className="email">{email}</div>
                <div className="mobile">{mobile}</div>
                <div className="city">{city}</div>
              </div>
              <div className="skills">
                {/* section title only displayed if there is something filled out */}
                {skillsObj[0].skill && (
                  <div className="sectionTitle">Skills</div>
                )}
                <div>{displaySkills}</div>
              </div>
            </div>
          </div>
          <div className="cvRight">
            <div className="cvTopRight">
              <div className="title">{title}</div>
            </div>
            <div className="cvBottomRight">
              {jobsObj[0].title && (
                <div className="work">
                  <div className="sectionTitle">Experience</div>
                  <div className="jobsDiv"> {displayJobs}</div>
                </div>
              )}
              {degreesObj[0].university && (
                <div className="education">
                  <div className="sectionTitle">Education</div>

                  <div className="displayDegreesDiv">{displayDegrees}</div>
                </div>
              )}
              {honorsObj[0].honor && (
                <div className="honors">
                  <div className="sectionTitle">Awards and Honors</div>

                  <div className="awardsDiv">{displayHonors}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
