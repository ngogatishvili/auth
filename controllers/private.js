
exports.getPrivateData=(req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"you got accesss to the private data in this route"
    })
}