const { dialogflow }=require('actions-on-google');
const interviewModel=require('../nlp/interview_engine');

var fallback='Could you repeat please.I did not get that';
var answer_variable;
var name;
var email;
var github;
const lifeSpan=5;


const app=dialogflow({
    debug:false,
    clientId:'32281843367-3tpgqujjmvppuglblngkrbuk7plirdua.apps.googleusercontent.com'
});




//function to set the context in the individual intents matched.
function setContext(context,conv){
  var precontext='awaiting_';
  conv.contexts.set(precontext+context,lifeSpan);
}

//convert the response from the model into JSON format.
function sanitize(response){
   return JSON.parse(response);
}

//welcome the candidate to the interview session.
app.intent('welcome',(conv,params)=>{
  setContext('get_contact_data',conv);
   conv.ask('Welcome to Acer Interview session.Your name please?');
})

//get candidates contact data
app.intent('getContactData',async(conv,params)=>{
   var display='';
   name=params.name;
  if(params.email == ''){
   display=`Hello ${params.name}. Provide your email address.`; 
  }else{
       email=params.email;
      //model gets the next question
         var resp=await interviewModel();
         resp=sanitize(resp);
         answer_variable=resp.answer;
         display=`Ready !\n${resp.quiz}`; 
         setContext('answer_1',conv);

        }
   conv.ask(display);
});

app.intent('question1',(conv,params)=>{
 setContext('answer_2',conv);
   conv.ask(`Expected :: ${answer_variable}\nYour answer:: ${params.ans_1}`);
});


//fallback intent in the cases where candidates response is vague.
app.fallback((conv)=>{
   conv.ask(fallback);
 })


// app.intent('question_1',async(conv,params)=>{
//   setContext('answer_two',conv);
//   candidate_response=params.answer_one;
//   console.log(`candidate_response ::: ${candidate_response}`);
//   console.log(`answer_variable ::: ${answer_variable}`);
//    //do a sentiment analysis SentimentAnalyzer(candidate_response,answer_variable)
//   //update the STATUS variable
//   var resp=await interviewModel();
//   resp=sanitize(resp); 
//   answer_variable=resp.answer;
//   console.log(`new answer_variable :::: ${answer_variable}`);
//   conv.ask(`STATUS\n ${resp.quiz}`);

// })

// app.intent('question_two',async(conv,params)=>{
//   setContext('answer_two',conv);

// })



// app.intent('end_session',async(conv)=>{
//    conv.close('Thanks for your responses. Bye');
   
// })


module.exports=app;