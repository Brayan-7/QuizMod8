var path = require('path');
console.log("models.js>imported path");
// para Postgress o Sqlite, lee fic. .env
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/

var urlK = process.env.DATABASE_URL; // PATH si lo hace
console.log("DATABASE_URL="+urlK);

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
console.log("creada url");
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);

var storage = process.env.DATABASE_STORAGE;
console.log("creadas vars. gestion BD:"+protocol);
var Sequelize = require('sequelize'); // Cargar Modelo ORM
console.log("imported Sequelize");

// Sequelize usa BBDD SQLite(local) o Postgres(Web), segun var. sacadas de DATABASE_URL
var sequelize = new Sequelize(DB_name, user, pwd,
{ dialect: protocol,
protocol: protocol,
port: port,
host: host,
storage: storage, // solo SQLite (.env)
omitNull: true // solo Postgres
}
);

console.log("creada Sequelize");
var Quiz = sequelize.import(path.join(__dirname,'quiz')); // Importar definicion de la tabla
console.log("imported "+storage);
exports.Quiz = Quiz;
console.log("Iniciando BD "+DB_name);

// sequelize.sync() inicializar tabla quiz (pregunta,respuesta) en DB
sequelize.sync().then(function() { // success() por then(..) ejecuta el manejador una vez creada la tabla
Quiz.count().then(function (count){ //then
console.log("tenia=" + count+" regs." );
if(count === 0) { // la tabla se inicializa solo si está vacía
	console.log("Creandola MultiRegistro."); // pag.28
	Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma' } );
	Quiz.create({pregunta: 'Capital de Argentina', respuesta: 'Buenos Aires' } );
	Quiz.create({pregunta: 'Capital de Francia', respuesta: 'Paris' } );
	Quiz.create({pregunta: 'Oro parece plata no es, que es?', respuesta: 'Platano' } );
	Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa' })
	.then(function(){console.log("Base de Datos creada")}); //then
}; 
}); 
}); 