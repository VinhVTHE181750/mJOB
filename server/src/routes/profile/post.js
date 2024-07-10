const db = require('../../models/DBContext');

const INSERT_PROFILE = `
INSERT INTO profile (user_id, user_avatar, user_bio, user_dob, user_address, user_citizen_id, user_email, user_phone_number) 
VALUES (@user_id, @user_avatar, @user_bio, @user_dob, @user_address, @user_citizen_id, @user_email, @user_phone_number);
`;

const profile = async (req, res) => {
  var inserted;
  try {
    const { userId, userAvatar, userBio, userDob, userAddress, userCitizenId, userEmail, userPhoneNumber } = req.body;
    const pool = await db.poolPromise;

    await pool
      .request()
      .input("user_id", db.sql.Int, userId)
      .input("user_avatar", db.sql.NVarChar, userAvatar || null) // Ensure to handle null values
      .input("user_bio", db.sql.NVarChar, userBio || null)
      .input("user_dob", db.sql.Date, userDob)
      .input("user_address", db.sql.NVarChar, userAddress || null)
      .input("user_citizen_id", db.sql.VarChar, userCitizenId)
      .input("user_email", db.sql.VarChar, userEmail)
      .input("user_phone_number", db.sql.VarChar, userPhoneNumber)
      .query(INSERT_PROFILE);

    inserted = true;
  } catch (err) {
    console.error('Error inserting data:', err);
    inserted = false;
  }

  if (!inserted) {
    res.status(500).send('Error inserting data');
  } else {
    res.status(201).send('Data inserted successfully');
  }
};

module.exports = {
  profile
};
