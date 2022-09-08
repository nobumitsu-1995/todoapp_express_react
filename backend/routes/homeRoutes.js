const router = require('express').Router(),
homeController = require('../controllers/homeController'),
errorController = require('../controllers/errorController');

router.get("/", homeController.index)
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router