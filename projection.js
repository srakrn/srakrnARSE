// Normal socket.io initalisation, and variables declaration
var socket = io();
var nameCl="blanked", classCl="", answerCl="blanked", total="", teacherClassCl="", question="";

//Give them the url
function url(){
  if (window.location.href.indexOf("localhost") != -1){
    return "Ask your teacher for the URL (Error: Obtained URL is localhost)"
  }
  else{
    return "Navigate to " + window.location.href.replace("/projection", "/student");
  }
}

$('#url').text(url());

//Where the data are sent via socket
socket.on('name', function(nameKey){
  nameCl = nameKey;
});

socket.on('classid', function(classKey){
  classCl = classKey;
});

//And the answers are appened.
function vaildator(value){
  if(value!=''){
    return value;
  }
  else{
    return '(not given)';
  }
}

socket.on('questionName', function(questionName){
  if (classCl == $('#projClassID').val()){
    question = questionName;
  }ฯ?ฯ?ฎ
});

socket.on('systemCommander', function(systemCommand){
  if (classCl == $('#projClassID').val()){
    switch(systemCommand){
      case 'multipleOpen':
      $('#messages').append('<li><i>Multiple choice answer submission for question named <b>' + question + '</b> are opened.</i></li>');
      break;
      case 'clozeOpen':
      $('#messages').append('<li><i>Cloze gap answer submission for question named <b>' + question + '</b> are opened.</i></li>');
      break;
      case 'buzzerOpen':
      $('#messages').append('<li><i>Hit the button to get scored for question named <b>' + question + '</b>.</i></li>');
      break;
      case 'answerClose':
      $('#messages').append('<li><i>Answer submission is now closed</i></li>');
      break;
    }
  }
});

socket.on('answer', function(answerKey){
  answerCl = answerKey;
  if (ClassCl == $('#projClassID').val){
    total = nameCl + " answered.";
    $('#messages').append($('<li>').text(total));
  }
});

//Clear logs
$('#clearLogs').click(function(){
  $("#messages").text("");
});
