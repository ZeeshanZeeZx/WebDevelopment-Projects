// ----------- getting all drums button in array
var numOfDrumBtn = document.querySelectorAll("button.drum");

//  ------ applying event listner in every button
for (var i = 0; i < numOfDrumBtn.length; i++) {
  numOfDrumBtn[i].addEventListener("click", function () {
    var buttonPressed = this.innerHTML; // getting which btn is pressed by mouse
    checkKey(buttonPressed); // this works if we press btn by mouse also
    buttonAnimation(buttonPressed);
  });
}
//  ----------------- getting which key is pressed by event listner
addEventListener("keydown", function (event) {
  checkKey(event.key);
  buttonAnimation(event.key);
});

//  -------------------- function which play sound according to percitular key
function checkKey(keyPressed) {
  switch (keyPressed) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
    case "j":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "k":
      var kickBass = new Audio("sounds/kick-bass.mp3");
      kickBass.play();
      break;
    case "l":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    default:
      console.log(buttonPressed);
  }
}

function buttonAnimation(keyPressed) {
  var btnPressed = document.querySelector(`.${keyPressed}`);
  btnPressed.classList.add("pressed");
  setTimeout(function () {
    btnPressed.classList.remove("pressed");
  }, 200);
}
