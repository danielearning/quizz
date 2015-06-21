var models = require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            }
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};


// GET /quizes
exports.index = function(req, res) {
  var q = {order: 'pregunta'};
  var search = "";
  if ((req.query.search || "") === "") {
  } else {
    search = "%" + (req.query.search).trim().replace(/ +/g, "%") + "%";
    q.where = {"pregunta": {like: search}};
  }
  models.Quiz.findAll(q).then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes, search: search});
  });
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = {}; // = models.Quiz.build(
  //  {pregunta: "qqq", respuesta: "www"}
  //);
  res.render('quizes/new', { quiz: quiz, errors: []});
};

// GET /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  // guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');  
  })   // res.redirect: Redirección HTTP a lista de preguntas
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer', 
    { quiz: req.quiz, 
      respuesta: resultado, 
      errors: []
    }
  );
  
};
