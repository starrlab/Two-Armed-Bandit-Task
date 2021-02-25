/*********Helper Functions************/
let saveData = (function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        let json = data,
            blob = new Blob([json], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

// Create our number formatter.
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function postDataToDropbox(filename, data){
    let jsonData = { Body: data, FileName: filename};
    $.ajax({
        url: "https://api.randyperrone.com/prod/post",
        type: "post",
        crossDomain: true,
        dataType: "json",
        contentType: 'text/plain',
        data: jsonData,
        success: function(json) {
            if(json == null) {
                alert("Your data was uploaded successfully");
            }
            else{
                alert("An error occurred while uploading your data, please let the web admin know of this issue.");
            }
        },
        error: function() {
            alert("An error occurred while uploading your data, please let the web admin know of this issue.");
        }
    });
}

