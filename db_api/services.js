const database = require('../servicio/database.js');
const CreateSqlRES =
`BEGIN GuardarRegistrosRESEMP (
  :SERVICIO,
  :ID_SERVICIO,
  :SUCCESS_INFO,
  :CODE,
  :MESSAGE); END;`;
async function CreateRES(context) {

  const INF = Object.assign({}, context); 
  await database.simpleExecute(CreateSqlRES, INF);

}
module.exports.CreateRES = CreateRES;
