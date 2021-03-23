/*************Variables************/
const VERSION = "1";
//const
const DECIDE_DURATION = 1500; //ms
const PREPARE_DURATION = 2000; //ms
const FEEDBACK_DURATION = 2000; //ms
const EARNINGS_DURATION = 8000; //ms  +2000ms: There is a bug in jspych that if a trial is ended early that the trial_duration for the ended trial will count towards the next trial.
const NUMBER_OF_BLOCKS = 8;
const NUMBER_OF_TRIALS = 20;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const LEFT_ARM_REWARDS = [10.0739913995968,9.94885699254065,10.1695386459635,7.46458590807043,3.92852061755008,2.50120058787445,9.40046882772721,6.84340101469405,13.2074697366373,17.2746156902263,13.9206493966647,14.7157045428748,10.6818347892287,15.2838855027048,12.4190409861273,11.9836348491354,11.6937547558009,11.1439051183313,13.8253558634868,14.0038974548531,19.8559362859039,11.825344991527,10.7169748620468,9.97046389569962,15.2080680670964,11.9169946038673,15.4866034228721,6.29331726548043,18.2624740343291,12.5758263304182,14.219411487393,13.9169930072664,15.6525279358803,19.5587177666895,10.4245110854979,19.6281648467814,8.8896444674056,9.47855383693176,8.33850741880549,14.2231841042587,4.04052441046396,0.146057119948235,5.20188418248019,1.17852601191818,2.58248376406582,12.425809252066,2.93740836719128,6.1648192990793,3.07520108183249,0.0717481731788103,6.81253158869997,10.642189832078,0.525438811775989,6.6377056984919,0.331429019782503,3.57788811024988,0.63037070982254,4.77163998122821,5.9134334394738,11.3444758528983,7.13675995500428,2.91189394912916,1.85059554198573,7.39035993385298,9.65416426690289,6.87239000355792,7.55224280844011,3.67034800373446,4.53541751425419,7.67105666047973,8.00887409657219,9.05097420064075,10.1522426796995,15.0366593659484,9.97555757951486,9.57020289327852,10.3078234148755,7.39890002263491,5.70404590583436,7.92040456478434,2.18273256730492,6.25907054224769,7.51150670008862,4.87889549648427,6.69350021461812,8.30358020266945,9.26778814674733,10.5571547510662,12.1392603314221,7.92721048679443,5.04155875319142,5.85362889634247,4.06320501667317,7.40990793432728,5.28941150517144,6.07624581018773,3.40452517140612,7.85057173931866,12.5226255711884,14.2576462150987,13.1219083707679,12.422823379898,13.1834467048779,15.080198158825,13.8387614979501,13.4786668327535,8.69715420776142,10.5454784381472,8.27015621844974,7.98200621516715,4.01548081706436,4.40876730706211,3.88995977671081,5.40716554305156,4.28588627176631,5.23436618826834,9.16654365804446,5.55783513106946,7.67606734895309,11.816799485652,15.2424151531156,16.7324478755735,14.7912239290627,13.4389616828414,14.1929289974674,5.72740797484241,10.1761679271426,14.2945816903099,11.3367997097695,14.7017813728935,12.9619436642501,13.3090799463329,13.9175543490179,19.1962041798471,14.2656982391113,7.53906183179527,10.5117894543321,13.4522449040127,6.62153146319529,9.99505357032649,8.70912719361417,1.85501908712299,8.37516163806942,13.3900888854578,6.37746654953333,14.6011904367463,7.32211318384965,7.83721751576419,18.8326341705487,11.7228951588394,18.3258067487833,19.3493378967203,14.841062028107,7.10201909080673,16.4437907391393,13.7854468079731,17.7606548812918,11.7527110160618,6.80698992808007,15.1955661318392];
const RIGHT_ARM_REWARDS = [7.77115351105843,15.7063673650032,6.17464883122157,6.23247208827316,7.0589968059133,12.7625547932282,11.2544304420778,8.78993034118098,9.10943796378933,5.55801299891334,13.6205181199733,8.04296858674141,12.5145674305012,6.40342415411168,5.68987097904474,10.0462050133109,6.24332663262448,0.466497285499319,5.28824732671693,1.49596012318088,7.273677138629,3.13511481024406,7.41212600987469,15.5521390112355,1.60687670152396,10.4608860500534,13.0294364174554,3.44744874854427,5.21478123887251,14.8973665867273,3.45177088739837,19.5562554161731,8.09276096294867,16.6675709915309,7.13169419031857,9.26166222091225,12.7176446109512,15.1251884629825,10.4151547923862,12.5682582941022,10.309714504153,9.75105012733687,9.98421283707086,8.21270356822061,0.351516010827969,4.59817940961245,4.63428763687943,0.3075603998851,9.59709404822389,13.0266183561101,15.347989980435,15.9471037079129,12.1263994012457,13.8118993647403,3.93998476049778,8.70710640203048,7.33268462410139,4.35396642576741,10.3952691754636,0.406559009692353,0.64403155669815,4.59022699434821,1.83515777610715,12.5382055514772,2.23274673593582,3.93025853873199,9.62167751314881,13.8881609220944,10.170797508704,12.2978657872743,10.7982743915498,9.19790443480879,10.9415872209668,15.3146970474405,11.9744672261089,1.72725947834555,4.77760698224564,6.34142260766855,0.504969249772719,1.13610455274149,1.62548987511903,2.7955325449313,5.53395593079882,3.74220774477954,3.56777723799558,5.60201641542483,8.9618399679079,9.03242303277537,13.1680990605955,13.3073967984969,13.1333631008677,16.4191739328384,15.0420834184545,15.3531000980086,13.8363317314064,14.2527146190093,10.5567684965695,9.12307908263566,8.30023826668193,6.42695065449529,8.19091499612903,3.06739088343451,6.67263687839814,5.1541572731543,4.52096002326687,11.1613464313146,13.0700634003678,11.0776242416325,10.3242527276221,7.54722133112865,9.28002455818475,11.191392773938,3.652822285896,7.24969357078275,8.62410668384629,6.84476888397083,6.07281205210616,7.55059120648381,9.56802850043043,8.72686020910082,8.36528746923794,10.5558019628782,8.50565523897915,9.44186370614554,13.7487938867219,16.423687249972,19.8415087039403,13.8424778803124,18.0666240482261,15.7448113434309,12.5692966734052,13.1377979263385,10.8704261978901,11.0378034574936,16.1007188014771,10.4751978717513,19.6753024735405,13.4712604285184,11.9672251740264,10.9049979930352,9.76287889287766,8.63814710303478,15.1983270780859,9.29061340526306,11.9195020917806,15.3239823944024,18.0852287359753,19.2564809533503,15.6619798118023,11.9052083840846,16.6361958823974,6.04025505051829,0.830800948906788,5.76599612220537,10.4277575892613,4.19832410872485,5.53192639339271,5.73091182849227,2.7482141504511,9.13976042412806];
const COMPUTER_REWARDS = [221.4342092,433.4567451,544.5021859,690.4050457,897.1923373,1076.013158,1342.431304,1552.442633];
//vars
let currentBlockNumber = 1;
let currentTrialNumber = 1;
let timeline = [];
let userRewardForCurrentTrial = 0;
let userResponseKeyPress = "";
let rewardCount = 0;
let RTtime = 0;
let csvData = "";
//metadata
csvData = "version," + VERSION + "\n";
csvData += "DECIDE_DURATION," + DECIDE_DURATION + "\n";
csvData += "PREPARE_DURATION," + PREPARE_DURATION + "\n";
csvData += "FEEDBACK_DURATION," + FEEDBACK_DURATION + "\n";
csvData += "NUMBER_OF_BLOCKS," + NUMBER_OF_BLOCKS + "\n";
csvData += "NUMBER_OF_TRIALS," + NUMBER_OF_TRIALS + "\n";
csvData += "KEYBOARD_PRESS_RIGHT," + KEYBOARD_PRESS_RIGHT + "\n";
csvData += "KEYBOARD_PRESS_LEFT," + KEYBOARD_PRESS_LEFT + "\n";
let myData = localStorage['objectToPass'];
localStorage.removeItem( 'objectToPass' ); // Clear the localStorage
csvData += "Username, Medication Date/Time, Stim on/off" +"\n";
csvData += myData;

//title
csvData += "Linux Time (on finish), Task Index, Total Time Elapsed, Test Type, Block, Trial, Action RT Time, User Response, Reward\n"

let instructions = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div >"+
        "<div  '><h2>You will complete 8 blocks in total. If you need to exit the game prior to that, press the escape key. Press any key to continue.</h3></div>" +
        "</div>",
}

let blockNumberPrompt = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: function() {
        return "<div><h1>Block #" + currentBlockNumber + " out of 8: Press Any Key to Continue</h1></div>"
    },
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
    on_finish: function (data) {
        data.trial_type = "decide";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "decide," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "n/a" + "\n";
    }
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
        data.trial_type = "action";
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        RTtime = data.rt;
        if(userResponseKeyPress == KEYBOARD_PRESS_RIGHT){
            userRewardForCurrentTrial = RIGHT_ARM_REWARDS[((currentBlockNumber-1)*NUMBER_OF_TRIALS+currentTrialNumber)-1];
        }
        else if(userResponseKeyPress == KEYBOARD_PRESS_LEFT){
            userRewardForCurrentTrial = LEFT_ARM_REWARDS[((currentBlockNumber-1)*NUMBER_OF_TRIALS+currentTrialNumber)-1];
        }
        else{
            alert("Could not read Keyboard press. Please try again");
            return;
        }
        rewardCount += userRewardForCurrentTrial;
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "action," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + "n/a" + "," + "n/a" + "\n";
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
    on_finish: function (data) {
        data.trial_type = "feedback";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "feedback_win," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "n/a" +  "\n";
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
        data.trial_type = "prepare";
        data.current_block = currentBlockNumber;
        data.current_trial = currentTrialNumber;
        data.user_response = userResponseKeyPress;

        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "prepare," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + userResponseKeyPress + "," + userRewardForCurrentTrial + "\n";
        //Check if block is finished, if so reset trials and increment blocks. Right after increment trial so we start at 1
        if(currentTrialNumber == NUMBER_OF_TRIALS){
            currentTrialNumber = 0;
            currentBlockNumber++;
        }
        currentTrialNumber++;
    }
};

let earnings = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: EARNINGS_DURATION,
    stimulus: function() {
        return "<div>"+
            "<div  '><h2>Your earnings so far: " + formatter.format(rewardCount).toString() + "</h2></div>" +
            "<div  '><h2>Computer opponent's earnings so far: " + formatter.format(COMPUTER_REWARDS[currentBlockNumber-2]).toString() + "</h2></div>" +
            "</div>"
    }
};

let blockOfTrials = {
    timeline: [decide, action, feedback, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [blockNumberPrompt, blockOfTrials, earnings, earnings],
    randomize_order: false,
    repetitions: NUMBER_OF_BLOCKS
}

jsPsych.init({
    timeline: [instructions, trialBlocks],
    on_finish: function() {
        //jsPsych.data.displayData();
        let filename = "task_" + Date.now().toString() + "_ver" + VERSION + ".csv";
        postDataToDropbox(csvData, filename);
        saveData(csvData, filename);
    }
});