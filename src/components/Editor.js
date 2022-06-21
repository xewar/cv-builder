import React, { Component } from 'react';
import Preview from './Preview';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  switchForm(event) {
    console.log(event.target);
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="left">
          <div class="formContainer">
            <form className="form">
              <div className="formInput">
                <input
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formInput">
                <input
                  placeholder="Title"
                  name="topTitle"
                  value={this.state.topTitle}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="More about you"
                  name="about"
                  value={this.state.about}
                  onChange={this.handleChange}
                />
              </div>
            </form>
            <div className="bottom">
              <button className="buttonLeft hidden"></button>
              <button className="autofill">Auto-fill</button>
              <button className="buttonRight">
                &#x27A1; &nbsp; &nbsp; Contact
              </button>
            </div>
          </div>
        </div>
        <div className="right">
          <Preview />
        </div>
      </div>
    );
  }
}
export default Editor;
