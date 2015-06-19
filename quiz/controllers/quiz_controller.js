
// GET /quizes/question
exports.question = function(req, res) {
   res.render('quizes/question', {pregunta: 'Deporte que combina natación, ciclismo y carrera pedestre'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
   if (req.query.respuesta === 'Triatlón'){
      res.render('quizes/answer', {respuesta: 'Correcto'});
   } else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
   }
};
