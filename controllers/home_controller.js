module.exports.home = async function(req, res){
    try{
        return res.render('home', {
            title: "Home",
            profile_user: user
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}