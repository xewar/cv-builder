import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';

class Education extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { degreesObj, handleChange, addNewEducation, deleteEducation } =
      this.props;
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
          <div className="trash" onClick={deleteEducation}>
            {' '}
            <FaTrash />
          </div>
        </div>
        <button onClick={addNewEducation}>+ Add More</button>
      </div>
    );
  }
}
export default Education;
