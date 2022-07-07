import React, { Component } from 'react';

class Skills extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { skillsList, addMore, handleChange } = this.props;
    return (
      <div className="formInput">
        <input
          placeholder="HTML & CSS"
          name="skillsList"
          value={skillsList}
          onChange={handleChange}
        />
        <input
          placeholder="JavaScript"
          name="skillsList"
          value={skillsList}
          onChange={handleChange}
        />
        <input
          placeholder="React"
          name="skillsList"
          value={skillsList}
          onChange={handleChange}
        />
        <button onClick={addMore}>+ Add More</button>
      </div>
    );
  }
}
export default Skills;
