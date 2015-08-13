//CRC32 from php.js
var makeCRCTable = function(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

var crc32 = function(str) {
    var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    var crc = 0 ^ (-1);

    for (var i = 0; i < str.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};

function SetDefault(){
  $('#classidechoer').text(crc32($('#channel').val()));
}

// Normal socket.io initalisation, and variables declaration
var socket = io();
var nQuestion=0, total="", questionRunning="", debug={};
var AnsA=0, AnsB=0, AnsC=0, AnsD=0, AnsE=0, AnsSum=0;
buttonsManager(false);

// Everything starts when teachers press the buttons
// DAMN NEED TO REFACTOR =_=

function vaildator(value){
  if(value!=''){
    return value;
  }
  else{
    return '(name not given)';
  }
}

function buttonsManager(status){
  if(status == true){
    $('#teacherStartMultipleSec').hide();
    $('#teacherStartClozeSec').hide();
    $('#teacherStartBuzzerSec').hide();
    $('#teacherStopSec').show();
    $('#channel').prop( "disabled", true );
    $('#clearLogs').prop( "disabled", true );
    $('#questionName').prop( "disabled", true );
  }
  else{
    $('#teacherStartMultipleSec').show();
    $('#teacherStartClozeSec').show();
    $('#teacherStartBuzzerSec').show();
    $('#teacherStopSec').hide();
    $('#channel').prop( "disabled", false );
    $('#clearLogs').prop( "disabled", false );
    $('#questionName').prop( "disabled", false );
  }

}
$('#teacherStartMultiple').click(function(){
  socket.emit('teacherX',{classID:$('#classidechoer').text(), questionName:vaildator($('#questionName').val()), systemCommander:'multipleOpen'});
});

$('#teacherStartCloze').click(function(){
  socket.emit('teacherX',{classID:$('#classidechoer').text(), questionName:vaildator($('#questionName').val()), systemCommander:'clozeOpen'});
});

$('#teacherStartBuzzer').click(function(){
  socket.emit('teacherX',{classID:$('#classidechoer').text(), questionName:vaildator($('#questionName').val()), systemCommander:'buzzerOpen'});
  });

$('#teacherStop').click(function(){
  socket.emit('teacherX',{classID:$('#classidechoer').text(), questionName:'(no questions are running)', systemCommander:'answerClose'});
});

socket.on('teacherX', function(teacherX){
  if(teacherX['classID'] == $('#classidechoer').text())
    {
      switch(teacherX['systemCommander'])
      {
        case 'multipleOpen':
          questionRunning="multiple";
          buttonsManager(true);
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + vaildator($('#questionName').val()) + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
        break;
        case 'clozeOpen':
          questionRunning="cloze";
          buttonsManager(true);
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + vaildator($('#questionName').val()) + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
        break;
        case 'buzzerOpen':
          questionRunning="buzzer";
          buttonsManager(true);
          $('#messages').append('<div class="panel panel-default" id="info"><div class="panel-heading"><a data-toggle="collapse" href="#q' + nQuestion + '" aria-expanded="false" aria-controls="q' + nQuestion + '"><h3 class="panel-title">' + vaildator($('#questionName').val()) + '</h3></a></div><div class="panel-body collapse.in" id="q' + nQuestion + '"><ul id="a' + nQuestion + '"</div></div>');
        break;
        case 'answerClose':
          if(questionRunning == "multiple"){
            $('#a'+nQuestion).append('<table class="table table-bordered table-stripped table-condensed"><caption>Score summary</caption><thead><tr><td>Choice</td><td>Answered</td></tr></thead><tbody><tr><td>A</td><td>'+AnsA+'</td></tr><tr><td>B</td><td>'+AnsB+'</td></tr><tr><td>C</td><td>'+AnsC+'</td></tr><tr><td>D</td><td>'+AnsD+'</td></tr><tr><td>E</td><td>'+AnsE+'</td></tr></tbody></table>');
            AnsA = 0; AnsB = 0; AnsC = 0; AnsD = 0; AnsE = 0;
          }
          questionRunning="";
          buttonsManager(false);
          nQuestion++;
        break;
      }
    }
});

//And the answers are appened.
socket.on('studentX', function(studentX){
  debug = studentX;
  if ( studentX['classID'] == $('#classidechoer').text() && studentX['questionName'] == $('#questionName').val() ){
    $('#a'+nQuestion).append($('<li>').text(studentX['name'] + " answered: " + studentX['answer']));
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
