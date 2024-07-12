
const User = require('../../models/user/User');

// GET all profiles
router.get('/', async (req, res) => {
  try {
    const users = User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching all profiles:', err);
    return res.status(500).send('Error fetching all profiles');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = User.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(500).send('Error fetching profile');
  }
});

module.exports = router;
