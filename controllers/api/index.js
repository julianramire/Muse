const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const generate = require('./generate')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/generate', generate)

module.exports = router;
