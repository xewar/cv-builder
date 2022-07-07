import React, { Component } from 'react';

class Work extends Component {
  constructor(props) {
    super(props);
    this.addMore = this.addMore.bind(this);
  }
  addMore(event) {
    event.preventDefault();
    console.log('to be filled in');
  }

  render() {
    const { jobsObj, handleChange } = this.props;
    return (
      <div className="formInput">
        <div className="job">
          <input
            placeholder="Your Job Title"
            name="title"
            value={jobsObj[0].title}
            onChange={handleChange}
          />
          <input
            placeholder="Company Name"
            name="organization"
            value={jobsObj[0].organization}
            onChange={handleChange}
          />
          <div className="dates">
            <input
              placeholder="Start"
              className="date"
              name="start"
              value={jobsObj[0].start}
              onChange={handleChange}
            />
            <input
              placeholder="End"
              className="date"
              name="end"
              value={jobsObj[0].end}
              onChange={handleChange}
            />
          </div>
          <textarea
            placeholder="Description"
            className="description"
            name="description"
            value={jobsObj[0].description}
            onChange={handleChange}
          />
        </div>
        <button onClick={this.addMore}>+ Add Job</button>
      </div>
    );
  }
}
export default Work;
