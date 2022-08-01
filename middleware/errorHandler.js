const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = {...err};
 

  error.message = err.message;

  if (err.code === 11000) {
    const message = 'duplicate filled value is detected for E-mail';
    error = new ErrorResponse(message, 400);
  }

  if(err.name==="ValidationError") {
      
  }



  return res.status(400).json({success:false,error})
};

module.exports = errorHandler;


