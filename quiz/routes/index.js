var express = require('express');
var router = express.Router();
var title = { title: 'Quiz @danielearning' };

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', title);
});


router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId


router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

router.get ('/quizes/:quizId(\\d+)/comments/new',    commentController.new);
router.post('/quizes/:quizId(\\d+)/comments/create', commentController.create);
router.put ('/comments/:commentId(\\d+)/publish',    commentController.publish);

router.get   ('/login', sessionController.new);
router.post  ('/login', sessionController.create);
router.delete('/login', sessionController.destroy);

router.get('/author', function(req, res) {
  res.render('author', title);
});

router.get('/statistics', statisticsController.retrieve);

module.exports = router;

