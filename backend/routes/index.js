const router = require('express').Router(),
homeRoutes = require('./homeRoutes'),
todoRoutes = require('./todoRoutes')

router.use("/todos", todoRoutes)
router.use("/", homeRoutes)

module.exports = router