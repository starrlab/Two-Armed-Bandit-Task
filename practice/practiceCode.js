const NUMBER_OF_TRIALS = 20;
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 2000; //ms
const WIN_LOSE_DURATION = 2000; //ms
const INSTRUCTIONS = "You will have the option to choose 2 levers: left or right.  These levers can be chosen by pressing the left arrow key for the left lever and the right arrow key for the right lever. One lever has a greater reward than the other, so choose carefully. This practice contains 20 trials to let you get the hang of the task.";
const PRACTICE_COMPLETE = "Practice Complete!";
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const LEFT_ARM_REWARDS = [83.337,88.632,106.8,91.244,92.127,89.99,91.72,83.373,91.958,86.467,88.274,85.404,84.9,85.658,72.414,86.71,93.669,95.026,87.915,82.854];
const RIGHT_ARM_REWARDS = [75.101,81.044,66.364,67.243,59.53,65.122,57.024,77.828,61.793,77.591,65.261,70.58,55.51,59.726,69.711,71.007,80.864,85.483,85.61,84.426];

let rewardCount = 0;
let userRewardForCurrentTrial = 0;
let currentTrialNumber = 1;
let timeline = [];

let instructions = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div >"+
        "<div  '><h2>" + INSTRUCTIONS + "</h2> <h3>Press any key to continue</h3></div>" +
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
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Decide</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>"
};

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Pull</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
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

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: function () {
        return "<div class='container'>"+
    "<div  '><img src='../images/HandleLeft.png'></img>" +
    "<p class='small'><strong>Press the ← key</strong></p></div>" +
    "<div  '><h1>You won " + formatter.format(userRewardForCurrentTrial).toString() + "</h1></div>" +
    "<div  '><img src='../images/HandleRight.png'></img>" +
    "<p class='small'><strong>Press the → key</strong></p></div>" +
    "</div>"
    }
};


let prepare = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: PREPARE_DURATION,
    prompt: function() {
        return "<div><h1>" + formatter.format(rewardCount).toString() + "</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img  class='hidden_image'  src='../images/HandleLeft.png'></img>" +
        "<p class='hidden_image' class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Prepare</h1></div>" +
        "<div  '><img  class='hidden_image'  src='../images/HandleRight.png'></img>" +
        "<p class='hidden_image' class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
        currentTrialNumber++;
    }
};

let practiceComplete = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div>"+
        "<div  '><h1>" + PRACTICE_COMPLETE + "</h1><h3>Press any key to go back</h3></div>" +
        "</div>",
    on_finish: function () {
        window.history.back();
    }
}

let blockOfTrials = {
    timeline: [decide, action, feedbackWinner, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [instructions, blockOfTrials, practiceComplete]
}

jsPsych.init({
    timeline: [trialBlocks]
});
