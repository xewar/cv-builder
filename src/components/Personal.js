import React from 'react';

const Personal = props => {
  const { title, about, firstName, lastName, handleChange } = props;
  return (
    <div className="formInput">
      <input
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />
      <input
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />
      <input
        placeholder="Title"
        name="topTitle"
        value={title}
        onChange={handleChange}
      />
      <input
        placeholder="More about you"
        name="about"
        value={about}
        onChange={handleChange}
      />
    </div>
  );
};
export default Personal;
