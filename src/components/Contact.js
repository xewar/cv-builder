import React, { Component } from 'react';

class Contact extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { twitter, website, email, mobile, city, handleChange } = this.props;
    return (
      <div className="formInput">
        <input
          placeholder="Twitter"
          name="twitter"
          value={twitter}
          onChange={handleChange}
        />
        <input
          placeholder="Website"
          name="website"
          value={website}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          placeholder="Mobile"
          name="mobile"
          value={mobile}
          onChange={handleChange}
        />
        <input
          placeholder="Location"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </div>
    );
  }
}
export default Contact;
