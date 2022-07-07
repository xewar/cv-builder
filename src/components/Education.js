import React, { Component } from 'react';

class Education extends Component {
  constructor(props) {
    super(props);
    this.addEducation = this.addEducation.bind(this);
  }
  addEducation(event) {
    event.preventDefault();
    console.log('to be filled in');
  }

  render() {
    const { degreesObj, handleChange } = this.props;
    return (
      <div className="formInput">
        <input
          placeholder="University Name"
          name="university"
          value={degreesObj[0].university}
          onChange={handleChange}
        />
        <input
          placeholder="Degree"
          name="degree"
          value={degreesObj[0].degree}
          onChange={handleChange}
        />
        <div className="dates">
          <input
            placeholder="Start"
            className="date"
            name="start"
            value={degreesObj[0].start}
            onChange={handleChange}
          />
          <input
            placeholder="End"
            className="date"
            name="end"
            value={degreesObj[0].end}
            onChange={handleChange}
          />
        </div>
        <button onClick={this.addEducation}>+ Add More</button>
      </div>
    );
  }
}
export default Education;
