var express = require('express');
var router = express.Router();
var schema=require("../dbschema");

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

router.get("/questions",function(req,res){
   schema.questionModel.find({}, {}, { limit: 2}, function(err,result){
       if(err) res.result(500).json({message: "something went wrong"});
       else {
           result[0].next = result[1]._id;
           res.status(200).json(result[0]);
       }
   });
});

module.exports = router;
