var models = require('../models/models.js');

// Autoload :id
exports.retrieve = function(req, res, next) {
  req.statistics = {
    Quiz_count: 0,
    Comment_count: 0,
    Quiz_Comment_average: "Sin datos",
    Quiz_without_Comment_count: 0,
    Quiz_with_Comment_count: 0
  };
  models.Quiz.count().then(function(count) {
    req.statistics.Quiz_count = count;

    models.Comment.count().then(function(count) {
      req.statistics.Comment_count = count;
      var avg = req.statistics.Comment_count / req.statistics.Quiz_count;
      if (avg != NaN && avg != undefined) {
	req.statistics.Quiz_Comment_average = avg;
      }
      
      var sequelize = models.sequelize;
      sequelize.query('select count(*) as count from "Quizzes" where id not in (select distinct "QuizId" from "Comments")', { type: sequelize.QueryTypes.SELECT})
      .then(function(results) {
	req.statistics.Quiz_without_Comment_count = results[0].count;
	req.statistics.Quiz_with_Comment_count = req.statistics.Quiz_count - results[0].count;
	res.render('statistics.ejs', { statistics: req.statistics });
      }).catch(function(error){next(error)});
    }).catch(function(error){next(error)});
  }).catch(function(error){next(error)});
};
