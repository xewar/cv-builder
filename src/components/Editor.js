import React, { useState, useRef } from 'react';
import Preview from './Preview';
import Personal from './Personal';
import Contact from './Contact';
import Skills from './Skills';
import Honors from './Honors';
import Education from './Education';
import Work from './Work';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowDown,
  faSearchPlus,
  faSearchMinus,
} from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from 'react-to-print';

const Editor = props => {
  const [info, setInfo] = useState({
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
    honorsObj: [
      {
        id: uniqid(),
        honor: '',
        year: '',
      },
      {
        id: uniqid(),
        honor: '',
        year: '',
      },
      {
        id: uniqid(),
        honor: '',
        year: '',
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
    formElements: [
      'personal',
      'contact',
      'skills',
      'education',
      'work',
      'honors',
    ],
    currentForm: 'personal',
    nextForm: 'contact',
    prevForm: '',
    showLeftButton: false,
    showRightButton: true,
    autofillClearButton: 'auto-fill',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInfo(prevInfo => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  //updates the work, education, and skills forms as you type
  function handleChangeObjects(event) {
    let type = event.target.parentNode.parentNode.className;
    let obj;
    let id;
    if (type === 'job' || type === 'jobsDiv') {
      obj = info.jobsObj;
    } else if (type === 'skillsDiv') {
      obj = info.skillsObj;
    } else if (type === 'honorsDiv') {
      obj = info.honorsObj;
    } else {
      obj = info.degreesObj;
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
    setInfo(prevInfo => {
      return {
        ...prevInfo,
        [obj]: obj,
      };
    });
  }

  //add a new job, degree, or skill
  function addNew(event) {
    event.preventDefault();
    let type = event.target.textContent;
    let obj; //
    let newInstance; //new instance of the object
    if (type === '+ Add More') {
      obj = info.degreesObj;
      newInstance = {
        id: uniqid(),
        university: '',
        degreeType: '',
        start: '',
        end: '',
      };
    } else if (type === '+ Add Job') {
      obj = info.jobsObj;
      newInstance = {
        id: uniqid(),
        organization: '',
        title: '',
        start: '',
        end: '',
        description: '',
      };
    } else if (type === '+ Add Award') {
      obj = info.honorsObj;
      newInstance = {
        id: uniqid(),
        year: '',
        honor: '',
      };
    } else {
      obj = info.skillsObj;
      newInstance = {
        id: uniqid(),
        skill: '',
      };
    }
    obj.push(newInstance);
    setInfo(prevInfo => {
      return {
        ...prevInfo,
        [obj]: obj,
      };
    });
  }

  //deleting a job or degree with the trash icon
  function deleteInstance(event) {
    let type =
      event.target.parentNode.parentNode.parentNode.parentNode.className;
    let obj; //object to be updated (either jobs or education)
    //get the id of the specific job or degree to delete
    let id = event.target.parentNode.parentNode.parentNode.parentNode.id;
    let newInstance;
    if (type === 'degree' || type === 'degreesDiv') {
      obj = info.degreesObj;
      newInstance = {
        id: uniqid(),
        university: '',
        degreeType: '',
        start: '',
        end: '',
      };
    } else if (type === 'job' || type === 'jobsDiv') {
      obj = info.jobsObj;
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
    setInfo(prevInfo => {
      return {
        ...prevInfo,
        [obj]: obj,
      };
    });
  }

  function switchForm(event) {
    //changes the form that's displayed
    let direction = event.target.className.slice(6); //'Right' or 'Left'
    let currentIndex = info.formElements.findIndex(
      item => item === info.currentForm
    );
    let newIndex;
    if (direction === 'Right') {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
    }
    setInfo(prevInfo => {
      return {
        ...prevInfo,
        currentForm: info.formElements[newIndex],
        nextForm: info.formElements[newIndex + 1],
        prevForm: info.formElements[newIndex - 1],
      };
    });
    if (newIndex === 0) {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
          showLeftButton: false,
        };
      });
    } else {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
          showLeftButton: true,
        };
      });
    }
    if (newIndex === 5) {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
          showRightButton: false,
        };
      });
    } else {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
          showRightButton: true,
        };
      });
    }
  }
  function autofill(event) {
    let mode = event.target.textContent;
    if (mode === 'auto-fill') {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
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
              university: 'Universidad ICESI',
              degreeType: 'BA in Creative Writing',
              start: '2021',
              end: 'Present',
            },
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
                'Asociación de Mujeres Afrodescendientes de Yolombó',
              title: 'President',
              start: '2010',
              end: '2013',
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
          honorsObj: [
            {
              id: uniqid(),
              honor: `BBC's most influential woman`,
              year: '2019',
            },
            {
              id: uniqid(),
              honor: 'Goldman Environmental Prize',
              year: '2018',
            },
            {
              id: uniqid(),
              honor: 'Colombian National Prize for the Defense of Human Rights',
              year: '2015',
            },
          ],
        };
      });
    } else {
      setInfo(prevInfo => {
        return {
          ...prevInfo,
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
          honorsObj: [
            {
              id: uniqid(),
              honor: '',
              year: '',
            },
            {
              id: uniqid(),
              honor: '',
              year: '',
            },
            {
              id: uniqid(),
              honor: '',
              year: '',
            },
          ],
        };
      });
    }
  }
  const zoomIn = () => {
    let right = document.querySelector('.right');
    right.classList.add('fullSize');
  };
  const zoomOut = () => {
    let right = document.querySelector('.right');
    right.classList.remove('fullSize');
  };
  const componentRef = useRef();

  const displayForm = () => {
    if (info.currentForm === 'personal') {
      return (
        <Personal
          firstName={info.firstName}
          lastName={info.lastName}
          about={info.about}
          title={info.topTitle}
          handleChange={handleChange}
        />
      );
    } else if (info.currentForm === 'contact') {
      return (
        <Contact
          twitter={info.twitter}
          website={info.website}
          email={info.email}
          mobile={info.mobile}
          city={info.city}
          handleChange={handleChange}
        />
      );
    } else if (info.currentForm === 'skills') {
      return (
        <Skills
          skillsObj={info.skillsObj}
          handleChange={handleChangeObjects}
          addSkill={addNew}
        />
      );
    } else if (info.currentForm === 'education') {
      return (
        <Education
          degreesObj={info.degreesObj}
          handleChange={handleChangeObjects}
          addNewEducation={addNew}
          deleteEducation={deleteInstance}
        />
      );
    } else if (info.currentForm === 'work') {
      return (
        <Work
          jobsObj={info.jobsObj}
          handleChange={handleChangeObjects}
          addNewJob={addNew}
          deleteJob={deleteInstance}
        />
      );
    } else if (info.currentForm === 'honors') {
      return (
        <Honors
          honorsObj={info.honorsObj}
          handleChange={handleChangeObjects}
          addHonor={addNew}
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
              {info.showLeftButton && (
                <button className="buttonLeft" onClick={switchForm}>
                  {info.prevForm} &nbsp;{' '}
                  <span className="flipped">&#x27A1;</span>
                </button>
              )}
            </div>
            <button className="autofill" onClick={autofill}>
              {info.autofillClearButton}
            </button>
            <div>
              {info.showRightButton && (
                <button className="buttonRight" onClick={switchForm}>
                  &#x27A1; &nbsp; {info.nextForm}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="previewContainer">
          <Preview
            refs={componentRef}
            firstName={info.firstName}
            lastName={info.lastName}
            about={info.about}
            title={info.topTitle}
            twitter={info.twitter}
            website={info.website}
            email={info.email}
            mobile={info.mobile}
            city={info.city}
            skillsObj={info.skillsObj}
            degreesObj={info.degreesObj}
            jobsObj={info.jobsObj}
            honorsObj={info.honorsObj}
          />
        </div>
        <div className="icons">
          <FontAwesomeIcon
            className="zoomIn"
            onClick={zoomIn}
            icon={faSearchPlus}
          />
          <FontAwesomeIcon
            className="zoomOut"
            onClick={zoomOut}
            icon={faSearchMinus}
          />
          <ReactToPrint
            trigger={() => {
              return (
                <FontAwesomeIcon className="download" icon={faFileArrowDown} />
              );
            }}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};
export default Editor;
