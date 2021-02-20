var color1 = "green";
var color2 = "red";
var color3 = "blue";
var color4 = "orange";
var color5 = "yellow";
var attemptNum = 1;


function load() {
    $("#progress").hide()
    $("#imageSources").hide()
    $("#topStatusGrid").hide()
}

function difficultySelected(diff) {
    console.log("Difficulty: " + diff);
    $("#difficultyContainer").fadeOut();
    setTimeout(function () {
        $("#progress").fadeIn();
        attempt(attemptNum)
    }, 500);
}

function attempt(attemptNum) {
    if (attemptNum == 1) {
        setColor(1, "green")
        setColor(2, "red")
    }
}

function codeEnterConfirmed() {
    $("#topColorGrid").fadeOut();
    $("#direction").fadeOut();
    $("#confirmCodeEntered").fadeOut();
    setTimeout(function () {
        $("#topStatusGrid").fadeIn();
        $("#direction").text("ENTER THE RESULTS BELOW:").fadeIn();
    }, 500);
}

function setColor(slotNum, color) {
    var fuse = $("#" + color + "Fuse").clone()
    $("#slot" + slotNum).html(fuse)
}
