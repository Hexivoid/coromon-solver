var color1 = {name: "green", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var color2 = {name: "red", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var color3 = {name: "blue", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var color4 = {name: "orange", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var color5 = {name: "yellow", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};

var attemptNum = 1;
var fusesAttemptedNum;

var correctNum;
var incorrectNum;
var invalidNum;

var slotAttemptColor = []
var slotAttemptStatus = []

function load() {
    $("#progress").hide()
    $("#imageSources").hide()
    $("#topStatusGrid").hide()
    $("#confirmResusltsEntered").hide()
    $("#historyContainer").hide()
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
    slotAttemptColor = [] //resetting
    slotAttemptStatus = [] //resetting
    if (attemptNum == 1) {
        setColor(2, "red")
        setColor(3, "blue")
        fusesAttemptedNum = 2;
    }
} //Could also ++ next attempt (attemptNum) above

function codeEnterConfirmed() {
    $("#topColorGrid").fadeOut();
    $("#direction").fadeOut();
    $("#confirmCodeEntered").fadeOut();
    $("#historyContainer").fadeOut(); //Back in below, maybe... a bit confusing!
    setTimeout(function () {
        addHistory() //Took me a while to find where to put this!
        $("#topStatusGrid").fadeIn();
        $("#confirmResusltsEntered").fadeIn()
        $("#direction").text("ENTER THE RESULTS BELOW:").fadeIn();
        if ($("#historyContainer:hidden")) { //Fade in if hidden
            $("#historyContainer").fadeIn()
        }
    }, 500);
    //Could put the 3 below in the grid itself, will have to rework CSS
    setStatus(5, "correct")
    setStatus(6, "incorrect")
    setStatus(7, "invalid")
    //console.log(color1.invalid);

}

function resultsEnterConfirmed() {
    correctNum = parseInt($("#correctNum :selected").val())
    incorrectNum = parseInt($("#inorrectNum :selected").val())
    invalidNum = parseInt($("#invalidNum :selected").val())

    var totalAttemptsEntered = correctNum+incorrectNum+invalidNum
    console.log(slotAttemptColor.filter(Boolean).length)
    if (totalAttemptsEntered != slotAttemptColor.filter(Boolean).length) {
        window.alert("You entered invalid results. Please input correct results or refresh the page to restart.")
    } else {
        $("#topStatusGrid").fadeOut();
        $("#confirmResusltsEntered").fadeOut();
        $("#direction").fadeOut();
        $("#historyContainer").fadeOut(); //Out and back in below
        setTimeout(function () {
            $("#topColorGrid").fadeIn();
            $("#direction").text("ENTER THE FOLLOWING CODE IN GAME:").fadeIn();
            $("#confirmCodeEntered").fadeIn();
            $("#historyContainer").fadeIn(); //Like I said, back in!
            addHistoryStatus()
        }, 500);
        attempt(attemptNum++) //Next attempt
    }
}

function setColor(slotNum, color) {
    var fuse = $("#" + color + "Fuse").clone()
    $("#slot" + slotNum).html(fuse)
    slotAttemptColor[slotNum] = color;
    //window["slot" + slotNum + "Attempt"] = color
}

function setStatus(slotNum, status) {
    var status = $("#" + status).clone()
    $("#slot" + slotNum).html(status)
    slotAttemptStatus[slotNum] = status;
}

function addHistory() {
    var history = $(".results:last").clone()
    for (i = 1; i < 4; i++) {
        var fuse = $("#" + slotAttemptColor[i] + "Fuse").clone()
        history.find("label").eq(i-1).html(fuse)
    }
    console.log(correctNum)
    $("#historyList").prepend(history).hide().fadeIn()
    /*for (i = 5; i < 7; i++) {
        var statusImg = $(slotAttemptStatus[i]).clone()
        history.find("label").eq(i-1).html(statusImg)
    }*/
    //#correctNum
}

function addHistoryStatus() {
    var history = $(".results").eq(0);
    history.find("label").eq(4).text(correctNum);
    history.find("label").eq(5).text(incorrectNum);
    history.find("label").eq(6).text(invalidNum);
    correctNum = "";
    incorrectNum = "";
    invalidNum = "";
}
