const ErrorResponse = require('../utils/errorResponse');

const errorHandler=async(err,req,res,next)=>{
  let error={...err};
  error.message=err.message;
    if(err.code===11000) {
        error=new ErrorResponse("duplicate value is detected for E-mail",400);
    }

    if(err.name==="ValidationError") {
      error=new ErrorResponse(Object.values(err.errors).map(item=>item.message).join(","),400);
      
    }

    res.status(error.statusCode||500).json({
      success:false,
      error:error.message||"Server error"
    })



    


    
}

module.exports=errorHandler;


