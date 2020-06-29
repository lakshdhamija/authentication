module.exports.home = async function(req, res){
    // populate user of each post
    try{
        return res.render('home', {
            title: "Home",
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}