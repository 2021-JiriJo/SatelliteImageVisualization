function check_session(req,res,next){
    if(req.session.uuid == undefined){
        next(new Error('Session Closed'));
    }
    else{
        next();
    }
}

export default check_session;