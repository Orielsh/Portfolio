'use strict';

const secondsElm = document.querySelector('#seconds');
const minutesElm = document.querySelector('#minutes');
const hoursElm = document.querySelector('#hours');

const secondHandElm = document.querySelector('#secondHand');
const minuteHandElm = document.querySelector('#minuteHand');
const hourHandElm = document.querySelector('#hourHand');

const paceRangeElm = document.querySelector('#pace');
const paceAmountElm = document.querySelector('#paceAmount');

const setMinuteElm = document.querySelector('#timeInputMinute');
const setHourElm = document.querySelector('#timeInputHour');
const setButtonElm = document.querySelector('#setTime');

setButtonElm.addEventListener('click', ()=>{
    minutes = Number(setMinuteElm.value);
    hours = Number(setHourElm.value);
    seconds = 59;
});

paceRangeElm.addEventListener('change',()=>{
    updatePace(paceRangeElm.value);
})

const analogElm = document.querySelector('.analog');

let seconds = 0;
let minutes = 0;
let hours = 0;

refreshView();

let timerId;

startClock(paceRangeElm.value);

function startClock(pace){
    timerId = setInterval(refreshTime, pace);
}

//using one timer
function refreshTime(){
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes == 60){
            minutes = 0;
            hours ++
            if(hours == 12){
                hours = 0;
            }
        }
    }
    refreshView();
}

function refreshView(){
    secondsElm.textContent = seconds.toString().padStart(2, 0);
    minutesElm.textContent = minutes.toString().padStart(2, 0);
    hoursElm.textContent = hours.toString().padStart(2, 0);

    secondHandElm.style = 'transform: rotate(seconds % 360)';
    secondHandElm.style = `transform: rotate(${(seconds)*6-90}deg)`;
    minuteHandElm.style = `transform: rotate(${(minutes)*6-90}deg)`;
    hourHandElm.style = `transform: rotate(${(minutes/60*30 + hours*30)-90}deg)`;
}

function updatePace(pace){
    clearInterval(timerId);
    paceAmountElm.textContent = `${pace}ms`;
    timerId = setInterval(refreshTime, pace);
}

const foo = async()=>{
    console.log("Hello World");
}// - see why it not work as in the class

//async: before function
//set interval or set timeout are 'heavy' functions and might not work as expected as js is 1 
//      thread only. so it pushed later on the event queue.

//add set time
//add stop option
//