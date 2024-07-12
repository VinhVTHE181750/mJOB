const User = require('../../models/user/User');
const WorkExperience = require('../../models/user/WorkExperience');

const submitWorkExp = async (req, res) => {
  try {
    const { WorkExperience } = req.body;
    const workExp = await WorkExperience.create(WorkExperience);


    return res.status(201).send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    return res.status(500).send('Error inserting data');
  }
};


module.exports = {
  submitWorkExp,
};
