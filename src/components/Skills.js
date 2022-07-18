import React from 'react';

const Skills = props => {
  const { skillsObj, handleChange, addSkill } = props;
  const placeholders = ['HTML & CSS', 'Javascript', 'React'];
  const renderSkills = skillsObj.map(skill => {
    return (
      <div className="skill" key={skill.id} id={skill.id}>
        <input
          placeholder={placeholders.shift()}
          name="skill"
          value={skill.skill}
          onChange={handleChange}
        ></input>
      </div>
    );
  });
  return (
    <div className="formInput">
      <div className="skillsDiv">{renderSkills}</div>
      <button onClick={addSkill}>+ Add Skill</button>
    </div>
  );
};
export default Skills;
