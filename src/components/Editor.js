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
    this.handleChangeWorkEducation = this.handleChangeWorkEducation.bind(this);
    this.addNew = this.addNew.bind(this);
    this.deleteInstance = this.deleteInstance.bind(this);
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
      formElements: ['personal', 'contact', 'skills', 'education', 'work'],
      currentForm: 'personal',
      nextForm: 'contact',
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
  handleChangeWorkEducation(event) {
    //updates the work and education forms as you type
    let type = event.target.parentNode.parentNode.className;
    let obj;
    let id;
    if (type === 'job' || type === 'jobsDiv') {
      obj = this.state.jobsObj;
    } else {
      obj = this.state.degreesObj;
    }
    if (event.target.name === 'start' || event.target.name === 'end') {
      //date elements are nested differently in the form
      id = event.target.parentNode.parentNode.id;
    } else {
      id = event.target.parentNode.id;
    }
    const { name, value } = event.target;
    let currentIndex = obj.findIndex(item => item.id === id);
    let updatedItem = { ...obj[currentIndex], [name]: value };
    obj[currentIndex] = updatedItem;
    this.setState({ obj });
  }

  addNew(event) {
    event.preventDefault();
    let type = event.target.textContent;
    let obj; //object to be updated (either jobs or education)
    let newInstance; //new instance of the object
    if (type === '+ Add More') {
      obj = this.state.degreesObj;
      newInstance = {
        id: uniqid(),
        university: '',
        degreeType: '',
        start: '',
        end: '',
      };
    } else if (type === '+ Add Job') {
      obj = this.state.jobsObj;
      newInstance = {
        id: uniqid(),
        organization: '',
        title: '',
        start: '',
        end: '',
        description: '',
      };
    }
    obj.push(newInstance);
    this.setState({ obj });
  }

  deleteInstance(event) {
    //deleting either a job or degree
    let type =
      event.target.parentNode.parentNode.parentNode.parentNode.className;
    let obj; //object to be updated (either jobs or education)
    //get the id of the specific job or degree to delete
    let id = event.target.parentNode.parentNode.parentNode.parentNode.id;
    let newInstance;
    if (type === 'degree') {
      obj = this.state.degreesObj;
      newInstance = {
        id: uniqid(),
        university: '',
        degreeType: '',
        start: '',
        end: '',
      };
    } else if (type === 'job') {
      obj = this.state.jobsObj;
      newInstance = {
        id: uniqid(),
        organization: '',
        title: '',
        start: '',
        end: '',
        description: '',
      };
    }
    let currentIndex = obj.findIndex(item => item.id === id);

    if (obj.length === 1) {
      //if you delete the last item, add a blank placeholder back to the object
      obj.push(newInstance);
    }
    obj.splice(currentIndex, 1);
    this.setState({ obj });
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
            handleChange={this.handleChangeWorkEducation}
            addNewEducation={this.addNew}
            deleteEducation={this.deleteInstance}
          />
        );
      } else if (this.state.currentForm === 'work') {
        return (
          <Work
            jobsObj={this.state.jobsObj}
            handleChange={this.handleChangeWorkEducation}
            addNewJob={this.addNew}
            deleteJob={this.deleteInstance}
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
                    {this.state.prevForm} &nbsp;{' '}
                    <span className="flipped">&#x27A1;</span>
                  </button>
                )}
              </div>
              <button className="autofill">auto-fill</button>
              <div>
                {this.state.showRightButton && (
                  <button className="buttonRight" onClick={this.switchForm}>
                    &#x27A1; &nbsp; {this.state.nextForm}
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
