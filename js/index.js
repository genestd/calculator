$(document).ready( function(){
  $("#btn9").on("click", function(){
   f_btnNum($(this));
  });
  $("#btn8").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn7").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn6").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn5").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn4").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn3").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn2").on("click", function(){
   f_btnNum($(this));
 });
  $("#btn1").on("click", function(){
   f_btnNum($(this));
 });
  $("#btnZero").on("click", function(){
   f_btnNum($(this));
 });
 $("#btnDec").on("click", function(){
  f_btnNum($(this));
 });
  $("#btnC").on("click", function(){
   f_btnC();
  });
  $("#btnAC").on("click", function(){
   f_btnAC();
  });
  $("#btnPlus").on("click", function(){
   setOperator($(this));
  });
  $("#btnMinus").on("click", function(){
   setOperator($(this));
  });
  $("#btnMult").on("click", function(){
   setOperator($(this));
  });
  $("#btnDiv").on("click", function(){
   setOperator($(this));
  });
  $("#btnEql").on("click", function(){
   f_btnEql();
  });
  $(document).on("keyup", function(e){
    console.log(e.which);
    switch( e.which ){
      case 13:
        $("#btnEql").click();
        break;

      case 42:
        $("#btnMult").click();
        break;
      case 43:
        $("#btnPlus").click();
        break;
      case 45:
        $("#btnMinus").click();
        break;
      case 46:
        $("#btnDec").click();
        break;
      case 47:
        $("#btnDiv").click();
        break;
      case 48:
        $("#btnZero").click();
        break;
      case 49:
        $("#btn1").click();
        break;
      case 50:
        $("#btn2").click();
        break;
      case 51:
        $("#btn3").click();
        break;
      case 52:
        $("#btn4").click();
        break;
      case 53:
        $("#btn5").click();
        break;
      case 54:
        $("#btn6").click();
        break;
      case 55:
        $("#btn7").click();
        break;
      case 56:
        if( e.shiftKey == true){
          $("#btnMult").click();
        } else {
          $("#btn8").click();
        }
        break;
      case 57:
        $("#btn9").click();
        break;
      case 96:
        $("#btnZero").click();
        break;
      case 97:
        $("#btn1").click();
        break;
      case 98:
        $("#btn2").click();
        break;
      case 99:
        $("#btn3").click();
        break;
      case 100:
        $("#btn4").click();
        break;
      case 101:
        $("#btn5").click();
        break;
      case 102:
        $("#btn6").click();
        break;
      case 103:
        $("#btn7").click();
        break;
        case 104:
        $("#btn8").click();
        break;
      case 105:
        $("#btn9").click();
        break;
      case 106:
        $("#btnMult").click();
        break;
      case 107:
        $("#btnPlus").click();
        break;
      case 109:
        $("#btnMinus").click();
        break;
      case 110:
        $("#btnDec").click();
        break;
      case 111:
        $("#btnDiv").click();
        break;
      case 187:
        if( e.shiftKey == true){
          $("#btnPlus").click();
        } else {
          $("#btnEql").click();
        }
        break;
      case 189:
        if (e.shiftKey == false){
          $("#btnMinus").click();
        }
        break;
      case 190:
        if (e.shiftKey == false){
          $("#btnDec").click();
        }
        break;
      case 191:
        if (e.shiftKey == false){
          $("#btnDiv").click();
        }
        break;
    }
  });
});

var buffer="";
var operator = "";
var val1=0;
var val2=0;
var total = 0;
var screenState = "NEW";

// clear current buffer
function f_btnC(){
  $("#screen").html("0");
  buffer="";
  secondVal = 0;
  screenState = "NEW";
  operator = "";
}
// clear current buffer and total
function f_btnAC(){
  $("#screen").html("0");
  screenState = "NEW";
  firstVal = 0;
  secondVal = 0;
  total = 0;
  operator="";
  buffer="";
}
// When a numeric (or decimal) button is pushed
// display it on screen.  If screen is 0, replace the value
function f_btnNum( btn ){
  if (btn.val() == "."){
    if (buffer.indexOf(".")<0){
      if(buffer.length == 0){
        buffer += "0";
      }
      buffer += btn.val();
      $("#screen").html(buffer);
    }
  } else {
    buffer += btn.val();
    $("#screen").html(buffer);
  }
}

// Perform the math functions
// Use the greatest number of decimal places to handle
// floating point errors
function doMath(  ){
  console.log( 'operator: ' + operator + ' val1: ' + val1 + ' val2:' + val2 + ' total:' + total);
  if (val1 == ""){
    val1 = "0";
  }
  var exp = getExp();
  switch( operator ){
    case "+":
      total = Math.round((total+parseFloat(val1) + parseFloat(val2))*exp)/exp;
      break;
    case "-":
      total = Math.round((total + parseFloat(val1))*exp)/exp;
      total = Math.round((total-parseFloat(val2))*exp)/exp;
      break;
    case "*":
      total = Math.round((total + parseFloat(val1))*exp)/exp;
      total = Math.round((total * parseFloat(val2))*exp)/exp;
      break;
    case String.fromCharCode(247):
    total = Math.round((total + parseFloat(val1))*exp)/exp;
    total = Math.round((total / parseFloat(val2))*exp)/exp;
      break;
    default:
      console.log( operator[0]);
      break;
  }
  val1 = 0;
  val2 = 0;
  operator = "";
  $("#screen").html(total);
}


function f_btnEql(){
  if (screenState == "NEW" || screenState == "BUFFER"){
    val1 = buffer;
    buffer = "";
    $("#screen").html("0");
    screenState = "CALCULATED";
  } else {
    val2 = buffer;
    buffer="";
    screenState = "CALCULATED";
    doMath();
  }
}

//set the operator when +,-,*,/ is pressed.
//if values are ready to calculate, it will call the math function
function setOperator(btn){
  console.log('Operator is: ' + operator + 'ScreenState is: ' + screenState);
  if (buffer !== "" ){
    if (buffer == "."){
      buffer = "";
    }
  }
    if (screenState == "NEW" || screenState == "BUFFER"){
      operator = btn.val();
      val1 = buffer;
      buffer = "";
      $("#screen").html("0");
      screenState = "CHAINING";
    } else if (screenState == "CHAINING") {
      val2 = buffer;
      doMath();
      operator = btn.val();
      buffer="";
      screenState = "CHAINING";
      doMath();
    } else {
      operator = btn.val();
      screenState = "CHAINING";
    }
}

//This function finds the number of decimal places in the operands
// it is used to eliminate floating point precision errors
function getExp(){
  var exp=10;
  var dec1=0;
  var dec2=0;
  if(val1 != ""){
    if (val1.indexOf('.') > 0){
     var dec1 = (val1.length-1) - val1.indexOf('.');
    }
  }
  if (val2.indexOf('.') > 0){
    var dec2 = (val2.length-1) - val2.indexOf('.');
  }

  if (dec1 > 0 || dec2 > 0){

    exp = Math.pow( exp, Math.max(dec1,dec2));
  }
  console.log(exp);
  return(exp);
}
