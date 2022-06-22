import React, { Component } from 'react';
import Preview from './Preview';
import Personal from './Personal';
import Contact from './Contact';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
      formElements: ['personal', 'contact', 'skills', 'education'],
      currentForm: 'personal',
      nextForm: 'contact',
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  }
  switchForm(event) {
    console.log(event.target.className);
    let direction = event.target.value;
    this.setState({
      currentForm: 'contact',
    });
    console.log(this.state.currentForm);
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
      }
    };
    return (
      <div className="mainContainer">
        <div className="left">
          <div className="formContainer">
            <form className="form">
              <div className="formInput">{displayForm()}</div>
            </form>
            <div className="bottom">
              <button className="buttonLeft hidden"></button>
              <button className="autofill">auto-fill</button>
              <button className="buttonRight" onClick={this.switchForm}>
                &#x27A1; &nbsp; &nbsp; {this.state.nextForm}
              </button>
            </div>
          </div>
        </div>
        <div className="right">
          <Preview
            test="hello"
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            about={this.state.about}
            title={this.state.topTitle}
            twitter={this.state.twitter}
            website={this.state.website}
            email={this.state.email}
            mobile={this.state.mobile}
            city={this.state.city}
          />
        </div>
      </div>
    );
  }
}
export default Editor;
