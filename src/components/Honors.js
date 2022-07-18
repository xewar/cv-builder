import React from 'react';

const Honors = props => {
  const { honorsObj, handleChange, addHonor } = props;
  const placeholders = ['Award 1', 'Award 2', 'Award 3'];
  const renderHonors = honorsObj.map(honor => {
    return (
      <div className="honor" key={honor.id} id={honor.id}>
        <input
          placeholder={placeholders.shift()}
          name="honor"
          value={honor.honor}
          onChange={handleChange}
        ></input>
      </div>
    );
  });
  return (
    <div className="formInput">
      <div className="honorsDiv">{renderHonors}</div>
      <button onClick={addHonor}>+ Add Award</button>
    </div>
  );
};
export default Honors;
