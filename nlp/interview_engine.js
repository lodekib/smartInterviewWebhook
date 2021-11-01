const fs=require('fs');
const { dockStart }=require('@nlpjs/basic');



 const interviewModel=async()=>{ 
var index=Math.floor((Math.random()*45)+1);
 var readCorpus=JSON.parse(fs.readFileSync(__dirname+'/corpus.json','utf8'));
  var quiz=readCorpus.data[index].utterances;

  const dock=await dockStart({use:['Basic']});
  const nlp=dock.get('nlp');
  await nlp.addCorpus(__dirname+'/corpus.json');
  await nlp.train();

  var response=await nlp.process('en',`${quiz}`);
  return JSON.stringify({
    'quiz':response.utterance,
    'answer':response.answer
  })
    
  
}

module.exports=interviewModel;