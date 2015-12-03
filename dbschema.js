/**
 * Created by administrator on 12/1/15.
 */
var mongoose=require('mongoose');
var questionSchema=new mongoose.Schema({
    question:String,
    type:String,
    choice:[String],
    next:String

});

var testSchema=new mongoose.Schema({
    title:String,
    author:String,
    date:Date,
    questions:[String]
});

var questionModel=mongoose.model('Question',questionSchema);
var testModel=mongoose.model('Test',testSchema);

mongoose.connect('mongodb://localhost/questions',function(err){
    if(err) console.log('there was a error connecting to db...');
    else{
        console.log('Connected to mongodb!');
       // createQuestions();
       // getAllQuestions();
       // createTests();
       // remove();
        getAllTests();
    }
});



function createQuestions(){
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


function createTests(){
    console.log("creating tests...");
    var test3=new testModel({
        title:"Test 3",
        author:"XYZ",
        date:Date.now(),
        questions:['aaaaaaaaa','jjjjjjjjj','ppppppppppppp']
    })
    test3.save(function(err,results) {
        if (err)console.log(err);
        else {
            console.log("test created successfully...");
        }
    });

}

function getAllTests(){
    testModel.find({},function(err,results){
        if(err) console.log('Error trying to get the test data');
        else console.log("Getting all tests: ",results);

        var tests=results.map(function(result) {
            return result.name;
        });

    });
}

function remove(){
    testModel.findByIdAndRemove({_id:'565f5652063dc1e3d7edf699'},function(err,results){
       if(err)console.log("Error trying to get the test data");
        else {
            console.log('record successfully deleted');
       }
    });
}

module.exports={
    questionModel:questionModel,
    testModel:testModel
}
