import React, { Component } from 'react';

class Education extends Component {
  constructor(props) {
    super(props);
    this.addEducation = this.addEducation.bind(this);
  }

  render() {
    function addEducation(event) {
      console.log('to be filled in');
    }
    const { degreesObj, handleChange } = this.props;
    return (
      <div className="formInput">
        <input
          placeholder="University Name"
          name="degreesObj"
          value={degreesObj}
          onChange={handleChange}
        />
        <button onClick={addEducation}>+ Add More</button>
      </div>
    );
  }
}
export default Education;
