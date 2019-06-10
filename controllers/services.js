const servicios = require('../db_api/services');
function ObtenerRES(req) {
  var servicio={};
  
  if(req.success===true){
     servicio = {
      SERVICIO: req.servicio,
      ID_SERVICIO: req.data,
      SUCCESS_INFO: "true",
      CODE: "null",
      MESSAGE: "null"
    };
  }else if(req.success===false){
    servicio = {
      SERVICIO: req.servicio,
      ID_SERVICIO: "null",
      SUCCESS_INFO: "false",
      CODE: req.error.error.code,
      MESSAGE: req.error.error.message
    };
  }else{
    servicio={
      SERVICIO: "ERROR",
      ID_SERVICIO: "",
      SUCCESS_INFO: "false",
      CODE: "",
      MESSAGE: "Error inesperado"
    }
  }
      
      return servicio;
    }
    
    async function postRES(req, res, next) {
      try {
     
      let MessageRES = ObtenerRES(req);
      MessageRES = await servicios.CreateRES(MessageRES);
      } catch (err) {
        console.log(err);
      }
    }
    module.exports.postRES = postRES;
  