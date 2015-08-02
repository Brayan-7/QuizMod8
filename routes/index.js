var express = require('express'); 
var router = express.Router();

var quizController = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res) {
res.render('index', { title: 'QUIZ', errors: []});
});

router.param('quizId',quizController.load); // autoload

// defino rutas /quizes
router.get('/quizes', quizController.index); // busqueda pregunta
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.get('/quizes/create', quizController.create);
router.get('/quizes/author',quizController.author);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put( '/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
module.exports = router;