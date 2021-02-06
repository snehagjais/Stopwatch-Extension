// Convert time to a format of hours, minutes, seconds, and milliseconds

function formating(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  let timeOnly = `${formattedMM}:${formattedSS}:${formattedMS}`;
  return timeOnly;
}

let initialTime;
let elapsedTime = 0;
let timerInterval;


function printNumber(txt) {
  document.getElementById("show").innerHTML = txt;
}
function printTime() {
    elapsedTime = Date.now() - initialTime;
    printNumber(formating(elapsedTime));
  }

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
let dateOnly;

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);

function getDateOnly() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();
	let dateOn = day + '-' + month + '-' + year;
	return dateOn;
}

function start() {
  initialTime = getTimeFromLocalStorage();
  if(initialTime == undefined) {
	initialTime = Date.now() - elapsedTime;
  }
  timerInterval = setInterval(printTime, 10);
  showButton("PAUSE");
  dateOnly = getDateOnly();
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  start();
});

function getTimeFromLocalStorage() {
  var localDateTime;
  chrome.storage.local.get('dateOnly', function (result) {
	localDateTime = result.dateOnly;
  });
  var localDate = localDateTime.split(' ')[0];
  var localTime = localDateTime.split(' ')[1];
  console.log(localDate);
  console.log(localTime);
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  printNumber("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
 
}

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PAUSE" ? pauseButton : playButton;
  const buttonToHide = buttonKey === "PAUSE" ? playButton : pauseButton; 
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
