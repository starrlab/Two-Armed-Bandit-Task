/*************Key Combo for pausing, ending task early and saving data************/
keys = [];
document.onkeydown = function (e) {
    let isEscape = (e.key === "Escape" || e.key === "Esc");

    if (isEscape) {
        jsPsych.pauseExperiment();
        keys.length = 0;
        let exitTask = confirm("Click OK to save data and quit OR Cancel to resume Task.\nTask Paused...");
        if (exitTask) {
            let filename = "task_" + Date.now().toString() + "_ver" + VERSION + ".csv";
            saveData(csvData, filename);
            postDataToDropbox(csvData, filename);
            let resume = confirm("Resume Experiment?");
            if (resume) {
                jsPsych.resumeExperiment();
            }
        }
        else{
            jsPsych.resumeExperiment();
        }
    }
}