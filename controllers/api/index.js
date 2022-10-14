const router = require('express').Router();
const userRoutes = require('./userRoutes');
<<<<<<< HEAD
const projectRoutes = require('./projectRoutes');
const generate = require('./generate')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/generate', generate)
=======
const aiRoutes = require('./apiRoutes');

router.use('/users', userRoutes);
router.use('/ai', aiRoutes);
>>>>>>> e67d737 (changed file names)

module.exports = router;
