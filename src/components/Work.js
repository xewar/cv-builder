import React, { Component } from 'react';

class Work extends Component {
  constructor(props) {
    super(props);
    this.addMore = this.addMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addMore(event) {
    event.preventDefault();
    console.log('to be filled in');
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { jobsObj } = this.props;
    let degree = { ...jobsObj[0], [name]: value };
    jobsObj[0] = degree;
    this.setState({ jobsObj });
    console.log(jobsObj[0]);
  }
  render() {
    const { jobsObj } = this.props;
    return (
      <div className="formInput">
        <div className="job">
          <input
            placeholder="Your Job Title"
            name="title"
            value={jobsObj[0].title}
            onChange={this.handleChange}
          />
          <input
            placeholder="Company Name"
            name="organization"
            value={jobsObj[0].organization}
            onChange={this.handleChange}
          />
          <div className="dates">
            <input
              placeholder="Start"
              className="date"
              name="start"
              value={jobsObj[0].start}
              onChange={this.handleChange}
            />
            <input
              placeholder="End"
              className="date"
              name="end"
              value={jobsObj[0].end}
              onChange={this.handleChange}
            />
          </div>
          <textarea
            placeholder="Description"
            className="description"
            name="description"
            value={jobsObj[0].description}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.addMore}>+ Add Job</button>
      </div>
    );
  }
}
export default Work;
