import React, { Component } from 'react';
import Preview from './Preview';
import Personal from './Personal';
import Contact from './Contact';
import Skills from './Skills';
import Education from './Education';
import Work from './Work';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowDown,
  faSearchPlus,
  faSearchMinus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.switchForm = this.switchForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeObjects = this.handleChangeObjects.bind(this);
    this.addNew = this.addNew.bind(this);
    this.autofill = this.autofill.bind(this);
    // this.zoomIn = this.zoomIn.bind(this);
    this.deleteInstance = this.deleteInstance.bind(this);
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
      skillsObj: [
        {
          id: uniqid(),
          skill: '',
        },
        {
          id: uniqid(),
          skill: '',
        },
        {
          id: uniqid(),
          skill: '',
        },
      ],
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
      autofillClearButton: 'auto-fill',
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  //updates the work, education, and skills forms as you type
  handleChangeObjects(event) {
    let type = event.target.parentNode.parentNode.className;
    let obj;
    let id;
    if (type === 'job' || type === 'jobsDiv') {
      obj = this.state.jobsObj;
    } else if (type === 'skillsDiv') {
      obj = this.state.skillsObj;
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

  //add a new job, degree, or skill
  addNew(event) {
    event.preventDefault();
    let type = event.target.textContent;
    let obj; //
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
    } else {
      obj = this.state.skillsObj;
      newInstance = {
        id: uniqid(),
        skill: '',
      };
    }
    obj.push(newInstance);
    this.setState({ obj });
  }

  //deleting a job or degree with the trash icon
  deleteInstance(event) {
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
    } else if (type === 'job' || type === 'jobsDiv') {
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
  autofill = event => {
    let mode = event.target.textContent;
    if (mode === 'auto-fill') {
      this.setState({
        autofillClearButton: 'clear',
        firstName: 'Francia',
        lastName: 'Márquez',
        about: 'Soy porque somos',
        topTitle:
          'Environmental Activist, Lawyer, and Vice-President of Colombia',
        twitter: '@FranciaMarquezM',
        website: 'franciamarquezmina.co',
        email: 'info@franciamarquezmina',
        mobile: '',
        city: 'Bogotá, Colombia',
        skillsObj: [
          {
            id: uniqid(),
            skill: 'Javascript',
          },
          {
            id: uniqid(),
            skill: 'React',
          },
          {
            id: uniqid(),
            skill: 'Node.js',
          },
          {
            id: uniqid(),
            skill: 'Express',
          },
          {
            id: uniqid(),
            skill: 'HTML',
          },
          {
            id: uniqid(),
            skill: 'CSS',
          },
        ],
        degreesObj: [
          {
            id: uniqid(),
            university: 'Universidad Santiago de Cali',
            degreeType: 'J.D',
            start: '2017',
            end: '2020',
          },
        ],
        jobsObj: [
          {
            id: uniqid(),
            organization:
              'the National Peace, Reconciliation, and Coexistence Committee',
            title: 'President',
            start: '2021',
            end: 'Present',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.`,
          },
          {
            id: uniqid(),
            organization:
              'Association of Community Councils of the North of Cauca (ACONC)',
            title: 'Activist',
            start: '1997',
            end: 'Present',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.`,
          },
          {
            id: uniqid(),
            organization: 'Black Communities Process Organization (PCN)',
            title: 'Active Member',
            start: '1997',
            end: 'Present',
            description: `Duis aute irure dolor in reprehenderit in voluptate velit esse
           cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
           cupidatat non proident, sunt in culpa qui officia deserunt
           mollit anim id est laborum.`,
          },
        ],
      });
    } else {
      this.setState({
        autofillClearButton: 'auto-fill',
        firstName: '',
        lastName: '',
        about: '',
        topTitle: '',
        twitter: '',
        website: '',
        email: '',
        mobile: '',
        city: '',
        skillsObj: [
          {
            id: uniqid(),
            skill: '',
          },
          {
            id: uniqid(),
            skill: '',
          },
          {
            id: uniqid(),
            skill: '',
          },
        ],
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
      });
    }
  };
  zoomIn = () => {
    let right = document.querySelector('.right');
    right.classList.add('fullSize');
  };
  zoomOut = () => {
    let right = document.querySelector('.right');
    right.classList.remove('fullSize');
  };

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
            skillsObj={this.state.skillsObj}
            handleChange={this.handleChangeObjects}
            addSkill={this.addNew}
          />
        );
      } else if (this.state.currentForm === 'education') {
        return (
          <Education
            degreesObj={this.state.degreesObj}
            handleChange={this.handleChangeObjects}
            addNewEducation={this.addNew}
            deleteEducation={this.deleteInstance}
          />
        );
      } else if (this.state.currentForm === 'work') {
        return (
          <Work
            jobsObj={this.state.jobsObj}
            handleChange={this.handleChangeObjects}
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
              <button className="autofill" onClick={this.autofill}>
                {this.state.autofillClearButton}
              </button>
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
            skillsObj={this.state.skillsObj}
            degreesObj={this.state.degreesObj}
            jobsObj={this.state.jobsObj}
          />
          <div className="icons">
            <FontAwesomeIcon
              className="zoomIn"
              onClick={this.zoomIn}
              icon={faSearchPlus}
            />
            <FontAwesomeIcon
              className="zoomOut"
              onClick={this.zoomOut}
              icon={faSearchMinus}
            />
            <FontAwesomeIcon
              className="download"
              icon={faFileArrowDown}
              download
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Editor;
