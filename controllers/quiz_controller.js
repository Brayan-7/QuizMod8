var models = require('../models/models.js'); //fvl
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
models.Quiz.find(quizId).then(
function(quiz) {
if (quiz) {
	req.quiz = quiz;
	next();
} else { next(new Error('No hallo quizId=' + quizId));}
}
).catch(function(error) { next(error);});
};

// GET /quizes debe pedir /hacer busqueda
exports.index = function(req, res) {
/*if (req.query.search) {
	models.Quiz.findAll(
		{where: ["pregunta like ?", '%' + req.query.search.replace(/ /g,"%") + '%'],
		order: ["pregunta"] }).then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes, errors: []});
}).catch(function(error) { next(error);})
} else {
	models.Quiz.findAll().then(function(quizes) {
	res.render('quizes/index.ejs', { quizes: quizes, errors: []});
}).catch(function(error) { next(error);})
	}*/
	models.Quiz.findAll().then(
		function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error)});
};

// GET /quizes/:id ahora llama show 
exports.show = function(req, res) {
models.Quiz.find(req.params.quizId).then(function(quiz) {
	res.render('quizes/show', {quiz:req.quiz, errors: []});
	})
};

// GET /quizes/:id/answer 
exports.answer = function(req, res) {
//models.Quiz.find(req.params.quizId).then(function(quiz){
var resultado = 'Incorrecta'; // que no distinga mayusculas
if ( req.query.respuesta === req.quiz.respuesta) {
	resultado = 'Correcta'; 
}
	res.render('quizes/answer',
		{ quiz: req.quiz, respuesta: resultado, errors: [] });
	//})
};

// GET /quizes/author
exports.author = function(req, res) {
res.render( 'quizes/author', { } );
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build( //Se crea objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz, errors: []});	
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);


	quiz
	.validate()
	.then(function(err){
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else{
			quiz
			.save({fields: ["pregunta","respuesta"]})
			.then(function(){res.redirect('/quizes');})
		}
	}
	);
	//GUARDA EN DB LOS CAMPOS PREGUNTA Y RESPUESTA DE QUIZ
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz; //autoload de isntancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.qui.respuesta = req.body.quiz.respuesta;

	req.quiz
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else{
				req.quiz  // SAVE:
				.save({fields: ["pregunta","respuesta"]})
				.then(function(){res.redirect('/quizes');});
			};
		}
	);
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};