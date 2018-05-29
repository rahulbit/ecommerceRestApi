const check = require('./../library/checkLib')
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib')

let isAuthenticate =(req, res,next)=>{
    if(req.params.authToken|| req.query.authToken||req.body.authToken|| req.header('authToken') )
    {
        if(req.params.authToken=='Admin' || req.query.authToken =='Admin' || req.body.authToken=='Admin'||req.header('authToken') =='Admin')
        {
              req.user ={fullName:'Admin', userId:'Admin'}
              next();
        }
        else{
                   logger.error('Incorrect Authentication token' ,'Authentication Middleware' ,5)
                   let apiResponse =  response.generate(true, 'Incorrect Authentication Token', 403,null)
                   res.send(apiResponse)
        } 
    }
    else{
        logger.error('Authentication Token Missing' , 'Authentication middleware',5)
         let apiResponse = response.generate(true, 'Authentication Token Missing' , 404, null)
    }
}

module.exports={
    isAuthenticate:isAuthenticate
}