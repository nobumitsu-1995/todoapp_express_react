const router = require('express').Router(),
usersController = require('../controllers/usersController')

router.get("/:id", usersController.show);
router.post("/", usersController.validate, usersController.create);
router.patch("/:id", usersController.validate, usersController.update);
router.delete("/:id", usersController.delete)
router.post("/login", usersController.validate, usersController.authenticate)

// Logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

module.exports = router;