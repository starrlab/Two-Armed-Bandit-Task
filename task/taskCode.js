/*************Variables************/
const VERSION = "1";
//const
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 1000; //ms
const WIN_LOSE_DURATION = 1000; //ms
const NUMBER_OF_BLOCKS = 1;
const NUMBER_OF_TRIALS = 4;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const CHECKMARK_WINNER = '✓';

//vars
let currentBlockNumber = 1;
let currentTrialNumber = 1;
let timeline = [];
let userRewardForCurrentTrial = 0;
let userResponseKeyPress = "";
let rewardCount = 0;
let RTtime = 0;
let csvData = "";
const LEFT_ARM_REWARDS = [83.337,88.632,106.8,91.244,92.127,89.99,91.72,83.373,91.958,86.467,88.274,85.404,84.9,85.658,72.414,86.71,93.669,95.026,87.915,82.854,90.117,90.764,90.383,74.983,73.569,68.798,77.569,73.177,74.138,71.788,74.145,76.756,73.37,81.07,74.838,81.257,84.885,73.566,89.462,76.775,64.552,87.558,91.259,84.006,69.04,77.956,99.95,78.239,93.939,92.992,92.557,90.391,93.301,82.232,105.05,67.826,99.698,105.3,96.323,96.02,89.591,108.66,89.818,81.042,97.877,89.994,100.59,104.9,103.28,89.284,108.18,86.403,106.47,101.44,92.603,93.461,77.553,91.738,93.698,77.132,95.407,78.773,61.411,71.272,62.621,51.638,76.119,71.366,72.457,69.258,50.493,80.598,65.329,56.806,47.678,53.072,56.551,54.624,55.565,77.477,53.39,29.659,86.343,58.745,35.982,68.884,62,63.785,68.908,89.319,62.184,66.827,45.81,60.224,80.729,79.144,59.715,92.031,82.677,90.825,79.748,101.92,110.37,92.751,88.638,92.399,87.48,101.47,92.453,115.74,88.481,98.379,84.039,96.129,77.224,78.077,77.87,104.62,94.402,90.024,99.197,95.356,103.57,108.36,88.206,116.23,87.614,95.151,114.21,111.85,96.708,89.933,103.62,92.381,103.3,97.21,95.342,100.42,56.535,84.494,77.418,77.623,80.197,73.821,78.9,74.137,70.109,71.876,83.38,87.532,86.822,85.778,88.021,95.713,87.472,81.956,79.399,73.892,73.415,75.945,77.068,82.134,83.742,93.063,92.751,98.736,92.546,102.9,99.558,100.23,95.945,85.76,93.662,92.872,96.403,94.283,99.096,91.575,82.236,79.357,83.904,92.102,77.789,73.482,66.321,62.631,66.801,67.649,56.702,63.955,65.863,59.324,66.845,72.861,71.447,69.312,67.813,71.917,73.065,74.335,67.631,69.533,63.781,60.48,57.309,60.332,66.465,59.91,67.085,70.078,68.472,70.645,74.813,74.29,79.795,87.795,86.367,78.205,74.398,80.658,77.85,84.748,88.516,88.202,70.313,91.84,93.617,100.51,95.386,92.696,101.98,93.174,111.56,101.55,107.59,101.38,91.723,95.414,93.497,89.499,96.705,75.304,91.812,99.413,99.924,100.05,106.34,93.424,84.535,96.214,93.041,89.277,98.589,102.78,90.215,103.77,104.12,84.616,79.473,83.522,112.54,77.457,103.93,107.37,91.88,95.314,82.58,121.82,119.19,75.699,95.5,94.358,101.19,70.641,90.112,104.03,117.99,96.042,111.55,122.04,73.688,76.799,76.016,86.69,78.455,82.502,79.59,47.269,90.978,66.17,32.849,74.115,54.941,48.138,60.371,68.232,34.469,68.732,77.382,85.087];
const RIGHT_ARM_REWARDS = [75.101,81.044,66.364,67.243,59.53,65.122,57.024,77.828,61.793,77.591,65.261,70.58,55.51,59.726,69.711,71.007,80.864,85.483,85.61,84.426,102.26,97.198,92.852,91.017,94.957,94.9,83.678,89.497,78.331,91.941,81.489,87.43,75.02,64.103,76.984,65.366,64.005,53.551,65.417,62.393,86.948,76.709,75.443,49.837,78.263,61.918,55.031,53.958,70.965,68.282,80.139,82.44,75.699,77.697,70.88,63.22,53.408,62.771,68.244,74.241,69.102,74.396,36.511,52.039,79.471,80.357,40.574,70.151,67.681,62.55,94.074,51.518,84.751,49.876,50.628,100.95,53.264,59.29,51.102,72.138,43.081,85.259,55.126,48.303,65.2,82.596,73.787,73.766,48.862,60.703,72.793,107.3,84.257,100.92,96.694,53.245,95.322,77.696,67.074,72.384,69.23,110.36,93.398,67.007,114.72,99.845,74.83,107.3,106.7,84.34,76.615,72.792,85.504,83.276,118.49,67.003,116.89,91.608,51.541,88.479,92.93,72.301,83.289,93.475,91.81,83.92,77.203,98.357,96.05,74.29,97.812,85.822,75.433,78.062,71.101,72.251,72.324,49.892,63.485,82.757,72.311,65.295,68.714,85.956,83.499,103.13,88.516,87.005,101.25,105.94,81.963,89.049,95.305,92.783,105.44,82.741,75.705,99.451,86.082,106.72,95.434,83.52,85.248,75.92,68.418,68.605,67.597,65.347,65.46,62.418,60.257,53.206,61.516,59.421,61.443,65.11,72.011,74.773,72.113,73.927,64.11,63.698,62.226,56.406,67.978,56.803,57.377,62.408,63.319,61.85,64.691,63.132,68.411,71.824,75.477,67.051,76.944,69.363,71.019,79.217,76.021,75.154,67.878,69.377,66.621,69.707,66.65,56.979,57.253,57.461,61.807,60.831,72.656,71.151,51.946,58.088,64.355,61.509,57.784,68.305,58.322,71.563,62.268,65.115,57.839,58.915,56.297,54.652,63.288,68.942,69.584,69.817,64.602,63.006,64.926,65.509,57.325,51.596,70.187,58.296,67.126,86.208,66.662,64.588,75.489,71.89,74.898,78.082,82.556,84.776,79.52,81.898,87.721,86.48,103.24,100.76,109.9,109.03,101.41,94.344,101.98,103.69,90.875,101.94,86.961,85.538,84.68,82.179,84.103,92.459,95.62,85.105,95.087,81.139,89.462,87.384,87.313,97.427,89.122,90.631,103.8,102.12,133.67,84.555,119.47,106.39,118.1,107.37,117.53,87.773,87.368,85.288,109.84,92.818,75.21,86.263,69.749,77.042,100.75,75.664,97.213,72.216,74.564,121.26,75.316,98.127,96.509,69.159,70.46,75.517,90.427,83.471,95.225,66.841,57.158,57.479,77.267,54.179,88.036,57.973];
//metadata
csvData = "version," + VERSION + "\n";
csvData += "DECIDE_DURATION," + DECIDE_DURATION + "\n";
csvData += "PREPARE_DURATION," + PREPARE_DURATION + "\n";
csvData += "WIN_LOSE_DURATION," + WIN_LOSE_DURATION + "\n";
csvData += "NUMBER_OF_BLOCKS," + NUMBER_OF_BLOCKS + "\n";
csvData += "NUMBER_OF_TRIALS," + NUMBER_OF_TRIALS + "\n";
csvData += "KEYBOARD_PRESS_RIGHT," + KEYBOARD_PRESS_RIGHT + "\n";
csvData += "KEYBOARD_PRESS_LEFT," + KEYBOARD_PRESS_LEFT + "\n";

//title
csvData += "Linux Time (on finish), Task Index, Total Time Elapsed, Test Type, Block, Trial, Action RT Time, User Response\n"

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
        prompt: function() {
            return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
        },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Decide a Lever to Pull!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "decide";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "decide," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "\n";
    }
};

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Pull a Lever!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "action";
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        RTtime = data.rt;
        if(data.key_press == KEYBOARD_PRESS_RIGHT){
            userRewardForCurrentTrial = RIGHT_ARM_REWARDS[data.trial_index];
        }
        else{
            userRewardForCurrentTrial = LEFT_ARM_REWARDS[data.trial_index];
        }
        rewardCount += userRewardForCurrentTrial;
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "action," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + "n/a" + "\n";
    }
};

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1 id='checkmark_for_winner'>" + CHECKMARK_WINNER + "</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "feedbackWinner";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "feedback_win," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" +  "\n";
    }
};

let prepare = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: PREPARE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img class='hidden_image' src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Prepare for the next trial!</h1></div>" +
        "<div  '><img class='hidden_image' src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "prepare";
        data.current_block = currentBlockNumber;
        data.current_trial = currentTrialNumber;
        data.user_response = userResponseKeyPress;

        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "prepare," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + userResponseKeyPress + "\n";
        //Check if block is finished, if so reset trials and increment blocks. Right after increment trial so we start at 1
        if(currentTrialNumber == NUMBER_OF_TRIALS){
            currentTrialNumber = 0;
            currentBlockNumber++;
        }
        currentTrialNumber++;
    }
};

let blockOfTrials = {
    timeline: [decide, action, feedbackWinner, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [blockOfTrials],
    randomize_order: false,
    repetitions: NUMBER_OF_BLOCKS
}

jsPsych.init({
    timeline: [trialBlocks],
    on_finish: function() {
        //jsPsych.data.displayData();
        let filename = "task_" + Date.now().toString() + "_ver" + VERSION + ".csv";
        saveData(csvData, filename);
    }
});