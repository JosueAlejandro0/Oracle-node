const servidor = require('./services/servidor');
const dbConfig = require('./config/database');
const database = require('./services/database');
const defaultThreadPoolSize = 4;
process.env.UV_THREADPOOL_SIZE = dbConfig.Connection.poolMax + defaultThreadPoolSize;

async function WebServer(){
  console.log('Inicio de la aplicacion');
  try {
    console.log('Iniciando modulo de database');
    await database.initialize(); 
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
  try{
    console.log('Inicio del servidor');
    await servidor.TestServer();
  }catch(err){
    console.log('Mensaje de error '+err);
    ProcessingInstruction.exit(1);
  }
}

WebServer();

async function shutdown(e) {
  let err = e;
  console.log('Apagando');
  try {
    console.log('Closing database module');
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
    err = err || e;
  }
  try {
    console.log('Cerrando servidor web');
    await webServer.close();
  } catch (e) {
    console.log('Mensaje de Error ', e);
    err = err || e;
  }
  console.log('Saliendo de proceso');
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown();
});
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');
  shutdown();
});
 
process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
  shutdown(err);
});