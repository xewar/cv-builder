import React, { Component } from 'react';

class Education extends Component {
  constructor(props) {
    super(props);
    this.addEducation = this.addEducation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addEducation(event) {
    event.preventDefault();
    console.log('to be filled in');
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { degreesObj } = this.props;
    let degree = { ...degreesObj[0], [name]: value };
    degreesObj[0] = degree;
    this.setState({ degreesObj });
    console.log(degreesObj);
  }
  render() {
    const { degreesObj } = this.props;
    return (
      <div className="formInput">
        <input
          placeholder="University Name"
          name="university"
          value={degreesObj[0].university}
          onChange={this.handleChange}
        />
        <input
          placeholder="Degree"
          name="degree"
          value={degreesObj[0].degree}
          onChange={this.handleChange}
        />
        <div className="dates">
          <input
            placeholder="Start"
            className="date"
            name="start"
            value={degreesObj[0].start}
            onChange={this.handleChange}
          />
          <input
            placeholder="End"
            className="date"
            name="end"
            value={degreesObj[0].end}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.addEducation}>+ Add More</button>
      </div>
    );
  }
}
export default Education;
