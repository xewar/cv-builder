import React, { Component } from 'react';

class Work extends Component {
  constructor(props) {
    super(props);
    this.addMore = this.addMore.bind(this);
  }

  render() {
    function addMore(event) {
      console.log('to be filled in');
    }
    const { jobsObj, handleChange } = this.props;
    return (
      <div className="formInput">
        <div class="job">
          <input
            placeholder="Your Job Title"
            name="jobsObj"
            value={jobsObj}
            onChange={handleChange}
          />
          <input
            placeholder="Company Name"
            name="jobsObj"
            value={jobsObj}
            onChange={handleChange}
          />
        </div>
        <button onClick={addMore}>+ Add More</button>
      </div>
    );
  }
}
export default Work;
