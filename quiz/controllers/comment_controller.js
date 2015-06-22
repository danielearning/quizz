var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes/new
exports.new = function(req, res, next) {
  comment = models.Comment.build();
  res.render('comments/new', { comment: comment, quiz: req.quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res, next) {
  var comment = models.Comment.build( 
    { comment: req.body.comment.comment,
      QuizId: req.params.quizId 
    });

  comment
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('comments/new', {comment: comment, quiz: req.quiz, errors: err.errors});
      } else {
        comment // save: guarda en DB campos pregunta y respuesta de quiz
        .save()
        .then( function(){ res.redirect('/quizes/' + req.params.quizId)}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
};

// PUT /comments/:commentId/publish
exports.publish = function(req, res, next) {
  req.comment.publicado = true;

  req.comment.save( {fields: ["publicado"]})
    .then( function(){ res.redirect('/quizes/'+req.comment.QuizId);} )
    .catch(function(error){next(error)});

  };
  