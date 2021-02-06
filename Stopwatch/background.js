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
  let dateTime = getDateOnly() + " " + timeOnly
  chrome.storage.local.set({'dateOnly': dateTime}, function() {
	  console.log('Value is set to ' + dateTime);
  });
  return timeOnly;
}

let initialTime;
let elapsedTime = 0;
let timerInterval;


function printTime() {
    elapsedTime = Date.now() - initialTime;
	formating(elapsedTime);
}

function getDateOnly() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();
	let dateOn = day + '-' + month + '-' + year;
	return dateOn;
}

function start() {
  initialTime = Date.now() - elapsedTime;
  timerInterval = setInterval(printTime, 10);
  dateOnly = getDateOnly();
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  start();
});
