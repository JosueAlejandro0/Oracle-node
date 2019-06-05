process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
const axios = require('axios');
var json={};
async function get(req, res, next) {
    try {
      console.log(req.params)
     axios.get(`http://cayas-ags-cayas.openshift.cpnlab/ws-cayas/rest/${req.params.uri}`).then(async response => {

              switch(req.params.uri){
                case 'empleado':
                    if(req.params.id === 'send'){
                     json={
                        url: 'employees',
                        service:'EMPLEADO',
                        data:response.data }
                    await post(json);
                    }  

                break;
                case 'estabid':
                    if(req.params.string==='send'){
                    json={
                      url: 'buildings',
                      service:'ESTABID',
                      data: response.data}
                    await post(json);
                    }
                       
                break;
                case 'jobcode':
                  if(req.params.string==='send'){
                    json={
                      url: 'jobs',
                      service:'JOBCODE',
                      data: response.data}
                    await post(json);
                    }
                  
                break;
                case 'deptid':
                  if(req.params.string==='send'){  
                    json={
                      url: 'adminUnits',
                      service:'DEPTID',
                      data: response.data}
                    await post(json);                  
                    }
                    
                
                break;
                case 'glexpense':
                  if(req.params.string==='send'){  
                    json={
                      url: 'cerys',
                      service:'GLEXPENSE',
                      data:response.data}    
                    await post(json);
                    }
                  
                break;  
              }

            
              res.send(response.data);
           
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });         
    } catch (err) {
      next(err);
    }
  }
   
module.exports.get = get;

async function post(req, next) {
  try {
    var data=req.data;
      axios({ 
        method: 'POST',
        url: `https://99.95.56.11:2255/satapi/interfaces/${req.url}`, 
        headers: {  
          "Content-Type": "application/json",
          "Authorization": "Basic c2F0OlNAVGFwaTIwMTghIw==",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Host": "99.95.56.11:2255",
          "accept-encoding": "gzip, deflate",
          "content-length": "891",
          "Connection": "keep-alive",
          "cache-control": "no-cache"
                  },               
        data:data      
              }
            ).then(response => {
            console.log('hola')
            console.log(data)
            console.log(response.data.details);
 
      }).catch(function (error) {
          if (error.response) {
            //The request was made and the server responded with a status code
            //that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            //The request was made but no response was received
            //`error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //http.ClientRequest in node.js
            console.log(error.request);
          } else {
            //Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });         
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
