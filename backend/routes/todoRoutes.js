const router = require('express').Router(),
  todosController = require('../controllers/todosController');

router.get('/', todosController.index);
router.get('/:id', todosController.show);
router.post('/', todosController.validate, todosController.create);
router.patch('/:id', todosController.validate, todosController.update);
router.delete('/:id', todosController.delete);

module.exports = router