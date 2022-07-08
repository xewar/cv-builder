import React, { Component } from 'react';
import Preview from './Preview';
import Personal from './Personal';
import Contact from './Contact';
import Skills from './Skills';
import Education from './Education';
import Work from './Work';
import uniqid from 'uniqid';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateEducation = this.updateEducation.bind(this);
    this.addNewEducation = this.addNewEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.addNewJob = this.addNewJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.updateWork = this.updateWork.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      about: '',
      topTitle: '',
      twitter: '',
      website: '',
      email: '',
      mobile: '',
      city: '',
      skillsList: [],
      degreesObj: [
        {
          id: uniqid(),
          university: '',
          degreeType: '',
          start: '',
          end: '',
        },
      ],
      jobsObj: [
        {
          id: uniqid(),
          organization: '',
          title: '',
          start: '',
          end: '',
          description: '',
        },
      ],
      formElements: ['work', 'personal', 'contact', 'skills', 'education'],
      currentForm: 'work',
      nextForm: 'personal',
      prevForm: '',
      showLeftButton: false,
      showRightButton: true,
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  updateEducation(event) {
    const degreesObj = this.state.degreesObj;
    let degreeId;
    if (event.target.name === 'start' || event.target.name === 'end') {
      degreeId = event.target.parentNode.parentNode.id;
    } else {
      degreeId = event.target.parentNode.id;
    }
    const { name, value } = event.target;
    let currentIndex = this.state.degreesObj.findIndex(
      degree => degree.id === degreeId
    );
    let degree = { ...degreesObj[currentIndex], [name]: value };
    degreesObj[currentIndex] = degree;
    this.setState({ degreesObj });
  }

  addNewEducation(event) {
    //adding a new college or university
    event.preventDefault();
    let degreesObj = this.state.degreesObj; //shorter name
    let newUni = {
      id: uniqid(),
      university: '',
      degreeType: '',
      start: '',
      end: '',
    };
    degreesObj.push(newUni);
    this.setState({ degreesObj });
  }

  deleteEducation(event) {
    const degreesObj = this.state.degreesObj;
    const degreeId =
      event.target.parentNode.parentNode.parentNode.parentNode.id; //getting the Id of the appropriate degree to delete
    let currentIndex = degreesObj.findIndex(degree => degree.id === degreeId);
    //if you delete all education info, regenerate a blank form
    if (degreesObj.length === 1) {
      let newUni = {
        id: uniqid(),
        university: '',
        degreeType: '',
        start: '',
        end: '',
      };
      degreesObj.push(newUni);
    }
    degreesObj.splice(currentIndex, 1);
    this.setState({ degreesObj });
  }

  addNewJob(event) {
    //adding a new college or university
    event.preventDefault();
    let jobsObj = this.state.jobsObj; //shortcut
    let newJob = {
      id: uniqid(),
      organization: '',
      title: '',
      start: '',
      end: '',
      description: '',
    };
    jobsObj.push(newJob);
    this.setState({ jobsObj });
    console.log(jobsObj);
  }

  deleteJob(event) {
    event.preventDefault();
    let jobsObj = this.state.jobsObj; //shortcut
    console.log('before', jobsObj);
    const jobId = event.target.parentNode.parentNode.parentNode.parentNode.id; //getting the Id of the appropriate degree to delete
    let currentIndex = jobsObj.findIndex(job => job.id === jobId);
    //if you delete all work history, regenerate a blank form
    if (jobsObj.length === 1) {
      let newJob = {
        id: uniqid(),
        organization: '',
        title: '',
        start: '',
        end: '',
        description: '',
      };
      jobsObj.push(newJob);
    }
    jobsObj.splice(currentIndex, 1);
    this.setState({ jobsObj });
    console.log('after', jobsObj);
  }

  updateWork(event) {
    // let jobInfo = { ...jobsObj[0], [name]: value };
    // jobsObj[0] = jobInfo;
    // this.setState({ jobsObj });
    const jobsObj = this.state.jobsObj;
    let jobId;
    if (event.target.name === 'start' || event.target.name === 'end') {
      jobId = event.target.parentNode.parentNode.id;
    } else {
      jobId = event.target.parentNode.id;
    }
    const { name, value } = event.target;
    let currentIndex = this.state.jobsObj.findIndex(job => job.id === jobId);
    let job = { ...jobsObj[currentIndex], [name]: value };
    jobsObj[currentIndex] = job;
    this.setState({ jobsObj });
  }

  switchForm(event) {
    //changes the form that's displayed
    let direction = event.target.className.slice(6); //'Right' or 'Left'
    let currentIndex = this.state.formElements.findIndex(
      item => item === this.state.currentForm
    );
    let newIndex;
    if (direction === 'Right') {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
    }
    this.setState({
      currentForm: this.state.formElements[newIndex],
      nextForm: this.state.formElements[newIndex + 1],
      prevForm: this.state.formElements[newIndex - 1],
    });
    if (newIndex === 0) {
      this.setState({
        showLeftButton: false,
      });
    } else {
      this.setState({
        showLeftButton: true,
      });
    }
    if (newIndex === 4) {
      this.setState({
        showRightButton: false,
      });
    } else {
      this.setState({
        showRightButton: true,
      });
    }
  }
  render() {
    const displayForm = () => {
      if (this.state.currentForm === 'personal') {
        return (
          <Personal
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            about={this.state.about}
            title={this.state.topTitle}
            handleChange={this.handleChange}
          />
        );
      } else if (this.state.currentForm === 'contact') {
        return (
          <Contact
            twitter={this.state.twitter}
            website={this.state.website}
            email={this.state.email}
            mobile={this.state.mobile}
            city={this.state.city}
            handleChange={this.handleChange}
          />
        );
      } else if (this.state.currentForm === 'skills') {
        return (
          <Skills
            skillsList={this.state.skillsList}
            handleChange={this.handleChange}
          />
        );
      } else if (this.state.currentForm === 'education') {
        return (
          <Education
            degreesObj={this.state.degreesObj}
            handleChange={this.updateEducation}
            addNewEducation={this.addNewEducation}
            deleteEducation={this.deleteEducation}
          />
        );
      } else if (this.state.currentForm === 'work') {
        return (
          <Work
            jobsObj={this.state.jobsObj}
            handleChange={this.updateWork}
            addNewJob={this.addNewJob}
            deleteJob={this.deleteJob}
          />
        );
      }
    };
    return (
      <div className="mainContainer">
        <div className="left">
          <div className="formContainer">
            <form className="form">{displayForm()}</form>
            <div className="bottom">
              <div>
                {this.state.showLeftButton && (
                  <button className="buttonLeft" onClick={this.switchForm}>
                    {this.state.prevForm} &nbsp; &nbsp;{' '}
                    <span className="flipped">&#x27A1;</span>
                  </button>
                )}
              </div>
              <button className="autofill">auto-fill</button>
              <div>
                {this.state.showRightButton && (
                  <button className="buttonRight" onClick={this.switchForm}>
                    &#x27A1; &nbsp; &nbsp; {this.state.nextForm}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Preview
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            about={this.state.about}
            title={this.state.topTitle}
            twitter={this.state.twitter}
            website={this.state.website}
            email={this.state.email}
            mobile={this.state.mobile}
            city={this.state.city}
            skillsList={this.state.skillsList}
            university={this.state.degreesObj[0].university}
            // jobsObj={this.state.jobsObj}
          />
        </div>
      </div>
    );
  }
}
export default Editor;
