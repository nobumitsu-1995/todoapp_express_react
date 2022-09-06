const router = require('express').Router(),
homeRoutes = require('./homeRoutes'),
todoRoutes = require('./todoRoutes'),
userRoutes = require('./userRoutes');

router.use("/todos", todoRoutes)
router.use("/user", userRoutes)
router.use("/", homeRoutes)

module.exports = router