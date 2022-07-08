import React, { Component } from 'react';
import Preview from './Preview';
import Personal from './Personal';
import Contact from './Contact';
import Skills from './Skills';
import Education from './Education';
import Work from './Work';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateEducation = this.updateEducation.bind(this);
    this.addNewEducation = this.addNewEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.addNewJob = this.addNewJob.bind(this);

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
      degreesObj: [{ id: 0, university: '', degree: '', start: '', end: '' }],
      jobsObj: [
        {
          id: 0,
          organization: '',
          title: '',
          start: '',
          end: '',
          description: '',
        },
      ],
      formElements: ['education', 'work', 'personal', 'contact', 'skills'],
      currentForm: 'education',
      nextForm: 'work',
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
    const { name, value } = event.target;
    const degreesObj = this.state.degreesObj;
    let degree = { ...degreesObj[0], [name]: value };
    degreesObj[0] = degree;
    this.setState({ degreesObj });
  }
  addNewEducation(event) {
    event.preventDefault();
    console.log('add Education');
  }
  deleteEducation(event) {
    console.log(event);
    console.log('delete Education');
  }

  addNewJob(event) {
    event.preventDefault();
    console.log('to be filled in');
  }

  updateWork(event) {
    const { name, value } = event.target;
    const jobsObj = this.state.jobsObj;
    let jobInfo = { ...jobsObj[0], [name]: value };
    jobsObj[0] = jobInfo;
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
