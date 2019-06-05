const servicios = require('../db_api/empleados.js');
function ObtenerRES(req) {

  const empleado = {
      SERVICIO: req.SERVICIO,
      ID_SERVICIO: req.ID_SERVICIO,
      SUCCESS_INFO: req.success,
      CODE: req.error.code,
      MESSAGE: req.error.message
    };
      
      return empleado;
    }
    
    async function postRES(req, res, next) {
      try {
      if(req.success===true){
        req.success='true';
      }else if(req.success===false){
        req.success='false';
      }  
    
      let MessageRES = ObtenerRES(req);
     // MessageRES = await servicios.CreateRES(MessageRES);
      } catch (err) {
        console.log(err);
      }
    }
    module.exports.postRES = postRES;
  