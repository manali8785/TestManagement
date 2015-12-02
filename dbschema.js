/**
 * Created by administrator on 12/1/15.
 */
var mongoose=require('mongoose');
var questionSchema=new mongoose.Schema({
    question:String,
    type:String,
    choice:[String,String,String,String],
    next:String

});

var questionModel=mongoose.model('Question',questionSchema);

mongoose.connect('mongodb://localhost/questions',function(err){
    if(err) console.log('there was a error connecting to db');
    else{
        console.log('Connected to mongodb!');
       // createQuestions();
       // getAllQuestions();
    }
});


function createQuestions(data,callback){
    console.log("creating questions...");
    var question1=new questionModel({
        question:"question 1",
        type:"mct",
        choice:["a","b","c","d"],
        next:"link to next question"
    })

    var question2=new questionModel({
        question:"question 2",
        type:"mct",
        choice:["p","q","r","s"],
        next:"link to next question"
    })

    var question3=new questionModel({
        question:"question 3",
        type:"mct",
        choice:["w","x","y","z"],
        next:"link to next question"
    })

    question3.save(function(err,results) {
        if (err)console.log(err);
        else {
            console.log("question created successfully...");
        }
    });
}

function getAllQuestions(){
    questionModel.find({},function(err,results){
        if(err) console.log('Error trying to get the question data');
        else console.log("Getting all questions: ",results);

        var questions=results.map(function(result) {
            return result.name;
        });

    });
}

module.exports={
    questionModel:questionModel
}
