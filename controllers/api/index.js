const router = require('express').Router();
const userRoutes = require('./userRoutes');
const generateRoutes = require('./generate.js');
const editorRoutes = require('./editorRoutes');
const aiRoutes = require('./aiRoutes')

router.use('/generate', generateRoutes)
router.use('/users', userRoutes);
router.use('/ai', aiRoutes);
router.use('/editor', editorRoutes);

module.exports = router;
