var express = require('express');
var router = express.Router();
var schema=require("../dbschema");
var tests;
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

router.get("/tests",function(req,res){
    schema.testModel.find(function(err,result){
        if(err) res.result(500).json({message: "something went wrong"});
        else {
            res.status(200).json(result);
            tests=result;
        }
    });
});

router.get("/tests/:id",function(req,res){
    schema.testModel.findById({_id:req.params.id},function(err,result){
        if(err) res.result(500).json({message: "something went wrong"});
        else {
            res.status(200).json(result);
            tests=result;
        }
    });
});

router.get("/questions",function(req,res){
    schema.questionModel.findById({_id:req.query.id},function(err,result){
        if(err) res.result(500).json({message: "something went wrong"});
        else {
            console.log(result);
            res.status(200).json(result);

        }
    });
});


module.exports = router;
