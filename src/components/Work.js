import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';

class Work extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { jobsObj, handleChange, addNewJob, deleteJob } = this.props;
    const renderJobs = jobsObj.map(job => {
      return (
        <div className="job" key={job.id} id={job.id}>
          <input
            placeholder="Your Job Title"
            name="title"
            value={job.title}
            onChange={handleChange}
          />
          <input
            placeholder="Company Name"
            name="organization"
            value={job.organization}
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            className="description"
            name="description"
            value={job.description}
            onChange={handleChange}
          />
          <div className="dates">
            <input
              placeholder="Start"
              className="date"
              name="start"
              value={job.start}
              onChange={handleChange}
            />
            <input
              placeholder="End"
              className="date"
              name="end"
              value={job.end}
              onChange={handleChange}
            />
            <div className="trash" onClick={deleteJob}>
              {' '}
              <FaTrash />
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="formInput">
        <div className="jobsDiv">{renderJobs}</div>

        <button onClick={addNewJob}>+ Add Job</button>
      </div>
    );
  }
}
export default Work;
