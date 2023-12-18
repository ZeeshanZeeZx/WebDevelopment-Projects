// alert("Js linked");
var i = 0;
var randomNumber1 = Math.ceil(Math.random() * 6);
var att = `images/dice${randomNumber1}.png`;
var change = document.querySelector("div.dice img").setAttribute("src", att);
var randomNumber2 = Math.ceil(Math.random() * 6);
var att = `images/dice${randomNumber2}.png`;
var change = document.querySelector("div.p2 img").setAttribute("src", att);

if (randomNumber1 > randomNumber2) {
  document.querySelector(".heading").innerHTML = "🚩 Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
  document.querySelector(".heading").innerHTML = "Player 2 Wins! 🚩";
} else {
  document.querySelector(".heading").innerHTML = "It's a Draw!!!";
}
