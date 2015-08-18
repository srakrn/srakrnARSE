// Normal socket.io initalisation, and variables declaration
var socket = io();
var nQuestion=0, total="", questionRunning="", questionName="", debug={};
var AnsA=0, AnsB=0, AnsC=0, AnsD=0, AnsE=0, AnsSum=0;

function vaildator(value){
  if(value!=''){
    return value;
  }
  else{
    return '(name not given)';
  }
}

socket.on('teacherX', function(teacherX){
  debug = teacherX;
  if(teacherX['classID'] == $('#classID').val())
    {
      switch(teacherX['systemCommander'])
      {
        case 'multipleOpen':
          questionRunning="multiple";
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + teacherX['questionName'] + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
          questionName = teacherX['questionName'];
        break;
        case 'clozeOpen':
          questionRunning="cloze";
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + teacherX['questionName'] + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
          questionName = teacherX['questionName'];
        break;
        case 'buzzerOpen':
          questionRunning="buzzer";
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + teacherX['questionName'] + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
          questionName = teacherX['questionName'];
        break;
        case 'answerClose':
          if(questionRunning == "multiple"){
            $('#a'+nQuestion).append('<table class="table table-bordered table-stripped table-condensed"><caption>Score summary</caption><thead><tr><td>Choice</td><td>Answered</td></tr></thead><tbody><tr><td>A</td><td>'+AnsA+'</td></tr><tr><td>B</td><td>'+AnsB+'</td></tr><tr><td>C</td><td>'+AnsC+'</td></tr><tr><td>D</td><td>'+AnsD+'</td></tr><tr><td>E</td><td>'+AnsE+'</td></tr></tbody></table>');
            AnsA = 0; AnsB = 0; AnsC = 0; AnsD = 0; AnsE = 0;
          }
          questionRunning="";
          questionName = teacherX['questionName'];
          nQuestion++;
        break;
      }
    }
});

//And the answers are appened.
socket.on('studentX', function(studentX){
  if ( studentX['classID'] == $('#classID').val() && studentX['questionName'] == questionName ){
    $('#a'+nQuestion).append($('<li>').text(studentX['name'] + " answered."));
    if(questionRunning == "multiple"){
        switch(studentX['answer']){
          case "A":
            AnsA++;
          break;
          case "B":
            AnsB++;
          break;
          case "C":
            AnsC++;
          break;
          case "D":
            AnsD++;
          break;
          case "E":
            AnsE++;
          break;
        }
        AnsSum++;
    }
  }
});

//Clear logs
  $('#clearLogs').click(function(){
    var clear = confirm("Do you want the system to CLEAR ALL answers logs? This CAN'T BE UNDO. ")
    if(clear==true)
    {
      $("#messages").text("");
    }
  });
