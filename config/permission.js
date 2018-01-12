exports.isLoggedIn = (req, res, next)=> {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.render('index',{});
};

exports.checkSearchPermission = (req,res,next) =>  {
    if(req.isAuthenticated()){
        if (req.user.permission.indexOf('search') !== -1){
            return next();
        }
        else{
            res.render('homepage',{title:'You don\'t have permission to do that, please connect the administrator!'});
            return;
        }
    }
    res.render('index',{});
    //console.log(req)
};

exports.checkCreatePermission = (req,res,next) =>  {
    if(req.isAuthenticated()){
        if (req.user.permission.indexOf('create') !== -1){
            return next();
        }
        else{
            res.render('homepage',{title:'You don\'t have permission to do that, please connect the administrator!'});
            return;
        }
    }
    res.render('index',{});
    //console.log(req)
};

exports.checkUpdatePermission = (req,res,next) =>  {
    if(req.isAuthenticated()){
        if (req.user.permission.indexOf('update') !== -1){
            return next();
        }
        else{
            res.render('homepage',{title:'You don\'t have permission to do that, please connect the administrator!'});
            return;
        }
    }
    res.render('index',{});
    //console.log(req)
};

exports.checkDeletePermission = (req,res,next) =>  {
    if(req.isAuthenticated()){
        if (req.user.permission.indexOf('delete') !== -1){
            return next();
        }
        else{
            res.render('homepage',{title:'You don\'t have permission to do that, please connect the administrator!'});
            return;
        }
    }
    res.render('index',{});
    //console.log(req)
};

exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.role === 'admin'){
            return next();
        }
        else{
            res.render('homepage',{title:'Only admin user can access that!'});
            return;

        }
    }
    res.render('index',{});
};
