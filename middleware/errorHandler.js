module.exports.errorHandler=(error,req,res,next)=>{
    res.send({
        success:false,
        error:error.message
    })
}