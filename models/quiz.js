//DEFINICIÓN DEL MODELO DE QUIZ
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{ pregunta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Pregunta"}}
		},
		  respuesta: {
		  	DataTypes.STRING,
		  	validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		  }
		}
	);
}