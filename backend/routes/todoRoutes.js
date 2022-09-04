const router = require('express').Router(),
  todosController = require('../controllers/todosController');

router.get('/', todosController.index);
router.get('/:id', todosController.show);
router.post('/', todosController.create);
router.put('/:id', todosController.update);
router.delete('/:id', todosController.delete);

module.exports = router