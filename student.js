// Normal socket.io initalisation, and variables declaration
var socket = io();

//Sounds
var chime = new Audio('chime.wav');
var buzzer = new Audio('buzzer.wav');

//And the command are received by students.
socket.on('teacherX', function(teacherX){
  if (teacherX['classID'] == $('#channel').val()){
    switch(teacherX['systemCommander']){
      case 'multipleOpen':
        $('#multiple').show();
        $('#cloze').hide();
        $('#buzzer').hide();
        //$('#questionPopup').removeClass('alert-success').addClass('alert-danger');
      break;
      case 'clozeOpen':
        $('#multiple').hide();
        $('#cloze').show();
        $('#buzzer').hide();
        //$('#questionPopup').removeClass('alert-success').addClass('alert-danger');
      break;
      case 'buzzerOpen':
        $('#multiple').hide();
        $('#buzzer').show();
        $('#cloze').hide();
        //$('#questionPopup').removeClass('alert-success').addClass('alert-danger');
      break;
      case 'answerClose':
        $('#multiple').hide();
        $('#cloze').hide();
        $('#buzzer').hide();
        //$('#questionPopup').removeClass('alert-danger').addClass('alert-success');
      break;
    }

    $('#questionPopup').text(teacherX['questionName']);

  }
});

//Now it's all about student's submission.
$('#clozeForm').submit(function(){
  if(document.getElementById('name').value=="" || document.getElementById('clozeField').value==""){
    alert("Either name or answer are blank. Please fill in required form.");
    return false;
  }
  else{
    socket.emit('studentX',{name: $('#name').val(), classID: $('#channel').val(), questionName: $('#questionPopup').text(), answer: $('#clozeField').val()});

    $('#clozeField').val('');
    $('#cloze').hide();
    return false;
  }
});

$('#multipleForm').submit(function(){
  if(document.getElementById('name').value=="" || $('input[name="multiple"]:checked').value==""){
    alert("Either name or answer are blank. Please fill in required form.");
    return false;
  }
  else{
    socket.emit('studentX',{name: $('#name').val(), classID: $('#channel').val(), questionName: $('#questionPopup').text(), answer: $('input[name="radio"]:checked').val()});

    $("input:radio").removeAttr("checked");
    $('#multiple').hide();
    return false;
  }
});

$('#buzzerClick').click(function(){
  if(document.getElementById('name').value==""){
    alert("Name field is blank. Please fill in required form.");
    return false;
  }
  else{
    socket.emit('studentX',{name: $('#name').val(), classID: $('#channel').val(), questionName: $('#questionPopup').text(), answer: '(hit the button)'});

    $('#buzzer').hide();
  }
  return false;
});

socket.on('teacherSoundCommands', function(teacherSoundCommands){
  if (teacherSoundCommands['classID'] == $('#channel').val()){
    switch(teacherSoundCommands['systemCommander']){
      case 'chime':
        chime.play();
      break;
      case 'buzzer':
        buzzer.play();
      break;
    }
  }
});
