var express = require('express');
var router = express.Router();
var title = { title: 'Quiz @danielearning' };

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', title);
});


router.param('quizId', quizController.load);  // autoload :quizId


router.get('/quizes',                      quizController.index);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',                  quizController.create);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
  res.render('author', title);
});

module.exports = router;

