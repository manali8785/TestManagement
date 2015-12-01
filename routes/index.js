var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
    if(req.user){
        next();
    }else{
        res.status(401).json({ message: "need to be authenticated" })
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/validate", function(req,res){
  res.status(200).json(req.user);
});

module.exports = router;
