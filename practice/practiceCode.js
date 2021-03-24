const NUMBER_OF_TRIALS = 20;

const DECIDE_DURATION = 1500; //ms
const PREPARE_DURATION = 2000; //ms
const FEEDBACK_DURATION = 2000; //ms
const EARNINGS_DURATION = 8000; //ms
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const LEFT_ARM_REWARDS = [8.7429,7.6598,8.4829,2.5411,5.2153,5.8229,5.9362,7.2058,8.8563,9.4206,10.348,15.277,14.252,13.6,14.012,17.553,14.649,16.605,14.797,14.75];
const RIGHT_ARM_REWARDS = [10.261,7.4839,6.7491,10.611,9.5649,7.1491,8.1862,4.9694,11.277,7.962,8.2007,8.7856,10.547,6.0807,4.6681,4.3869,11.49,13.987,13.069,12.829];
const COMPUTER_EARNINGS = 198;
let rewardCount = 0;
let userRewardForCurrentTrial = 0;
let currentTrialNumber = 1;
let timeline = [];

let instructions = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div >"+
        "<img src=\"pic_trulli.jpg\" >" +
        "<div  '><h2>In this game, your goal is to earn money by pulling levers. Pull one of two levers by pressing the \"left\" or \"right\" arrow key to win money. At any given time, one lever usually provides more money than the other lever. See if you can beat the computer! Good luck! Press any key to continue to the practice round.</h3></div>" +
        "</div>",
}

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Decide</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
};

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Pull</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        if(userResponseKeyPress == KEYBOARD_PRESS_RIGHT){
            userRewardForCurrentTrial = RIGHT_ARM_REWARDS[currentTrialNumber-1];
        }
        else if(userResponseKeyPress == KEYBOARD_PRESS_LEFT){
            userRewardForCurrentTrial = LEFT_ARM_REWARDS[currentTrialNumber-1];
        }
        else{
            alert("Could not read Keyboard press. Please try again");
            return;
        }
        rewardCount += userRewardForCurrentTrial;
    }
};

let feedback = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: FEEDBACK_DURATION,
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: function() {
        return "<div class='container'>"+
            "<div  '><img src='../images/HandleLeft.png'></img></div>" +
            "<div  '><h1>You won " + formatter.format(userRewardForCurrentTrial).toString() + "</h1></div>" +
            "<div  '><img src='../images/HandleRight.png'></img></div>" +
            "</div>"
    },
};

let prepare = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: PREPARE_DURATION,
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  class='hidden_image' '><img class='hidden_image' src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1></h1></div>" +
        "<div  class='hidden_image''><img class='hidden_image' src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_load: function(data){
        if(currentTrialNumber == NUMBER_OF_TRIALS){
            jsPsych.finishTrial();
        }
    },
    on_finish: function (data) {
        currentTrialNumber++;
    }
};

let earnings = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: EARNINGS_DURATION,
    stimulus: function() {
        return "<div>"+
            "<div  '><h2>Your earnings: " + formatter.format(rewardCount).toString() + "</h2></div>" +
            "<div  '><h2>Computer opponent's earnings: $" + COMPUTER_EARNINGS + "</h2></div>" +
            "</div>"
    }
};

let feedbackFinal = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: function() {
        if(rewardCount >= COMPUTER_EARNINGS){
            return "<div>"+
                "<div  '><h2>Well done, you beat the computer during the practice round! See if you can continue winning during the real game! Please press any key to continue</h2></div>" +
                "</div>"
        }
        else{
            return "<div>"+
                "<div  '><h2>Good effort. Let's see if you can beat the computer during the real game! Please press any key to continue</h2></div>" +
                "</div>"
        }
    },
    on_finish: function () {
        window.location.href = "../task/task.html";
    }
};

let blockOfTrials = {
    timeline: [decide, action, feedback, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [instructions, blockOfTrials, earnings, earnings, feedbackFinal]
}

jsPsych.init({
    timeline: [trialBlocks]
});
