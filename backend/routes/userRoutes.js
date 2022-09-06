const router = require('express').Router(),
usersController = require('../controllers/usersController');

router.get("/:id", usersController.show);
router.post("/", usersController.validate, usersController.create);
router.patch("/:id", usersController.validate, usersController.update);
router.delete("/:id", usersController.delete)

module.exports = router;