//carregar a biblioteca do express
var express = require('express');
const dbMysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
//incializando o express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Criar a conexão 




//função para executar as queries
function executarQuery(sql, response) {

  var db = dbMysql.createConnection(
    {
      host: "uni9db.mysql.database.azure.com",
      user: "kenji1996@uni9db",
      password: "yq4wnyei@R",
      database: "faculdade",
      port: 3306,
      ssl:true
    }
  );

  //Iniciar a conexão
db.connect(function (error) {
  if (error) throw error; //expor os erros que ocorrem na conexão
  console.log("Conectado com sucesso!");
});

  db.query(sql, function (error, result, fields) {
    if (error)
      response.json(error);
    else
      response.json(result);

      db.end();
  });
}

app.get('/', function (request, response) {
  response.send('Funcionando!');
});

//Retornar usuários
app.get('/usuarios', function (req, response) {
  const sql = "select * from usuarios";
  executarQuery(sql, response);
});


//Filtrar por ID
app.get('usuarios/:id', function (req, response) {
  const sql = `select * from usuarios where idUsuario = ${req.params.id} `;
  executarQuery(sql, response);
});

//Atualizar a tabela (put)
function cadastroClientes(){
app.post(`/cadastro`, function (request, res) {
  const { usuario, senha } = request.body;
  const sql = `insert into usuarios(usuario,senha) values('${usuario}', '${senha}');`;
  console.log(sql);
  executarQuery(sql, res);
});
}
//Deletar algum usuario da tabela
app.delete(`/usuarios/:id`, function(request, response){
    const id = request.params.id; 
    const sql = `delete from usuarios where idUsuario = '${id}';`;
    executarQuery(sql, response);
  });

app.put(`/usuarios/`, function(request, res){
  const { usuario, senha, idUsuario } = request.body;
  const sql = `update usuarios set usuario = '${usuario}', senha = '${senha}' where idUsuario = '${idUsuario}'`;
  executarQuery(sql, res);
});

//a porta que será exposta
app.listen(3306, function () {
  console.log('Example app listening on port 3306!');
});