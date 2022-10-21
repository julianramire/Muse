const router = require('express').Router();
const { AI, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // // Get all projects and JOIN with user data
    // const aiData = await AI.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const ais = aiData.map((ai) => ai.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('landingpage', { 
      // ais, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    
        // Get all projects and JOIN with user data
        const aiData = await AI.findAll({
          where: {is_public: true},
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const ais = aiData.map((ai) => ai.get({ plain: true }));

        // const aiSorted = ais.sort((a,b)=>a.last_updated()-b.lastupdated());

        // console.log(aiSorted);


        res.render('dashboard', { 
          ais, 
          logged_in: req.session.logged_in 
        });
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/ai/:id', withAuth, async (req, res) => {
  try {
    const aiData = await AI.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const ai = aiData.get({ plain: true });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    console.log(user.id)
    console.log(ai.user_id)

    res.render('ai', {
      user,
      ai,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/editor/:id', withAuth, async (req, res)=> {
  try {
    const documentData = await AI.findOne({ where: { id : req.params.id }})
  
    const document = documentData.get({plain: true});

    res.render('editor', {
      document,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(400).json(err);
  }
  });


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: AI }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
    
    console.log(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: AI }],
    });

    const user = userData.get({ plain: true });

    res.render('profile2', {
      ...user,
      logged_in: true
    });
    
    console.log(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
