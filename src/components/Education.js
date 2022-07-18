import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Education = props => {
  const { degreesObj, handleChange, addNewEducation, deleteEducation } = props;
  const renderDegrees = degreesObj.map(degree => {
    return (
      <div className="degree" key={degree.id} id={degree.id}>
        <input
          placeholder="University Name"
          name="university"
          value={degree.university}
          onChange={handleChange}
        />
        <input
          placeholder="Degree"
          name="degreeType"
          value={degree.degreeType}
          onChange={handleChange}
        />

        <div className="dates">
          <input
            placeholder="Start"
            className="date"
            name="start"
            value={degree.start}
            onChange={handleChange}
          />
          <input
            placeholder="End"
            className="date"
            name="end"
            value={degree.end}
            onChange={handleChange}
          />
          <div className="trash" onClick={deleteEducation}>
            {' '}
            <FaTrash />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="formInput">
      <div className="degreesDiv">{renderDegrees}</div>
      <button onClick={addNewEducation}>+ Add More</button>
    </div>
  );
};

export default Education;
