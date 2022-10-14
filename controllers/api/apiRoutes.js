const router = require('express').Router();
const { AI } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newAi = await AI.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAi);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const aiData = await AI.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!aiData) {
      res.status(404).json({ message: 'Nothing found with this id!' });
      return;
    }

    res.status(200).json(aiData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
