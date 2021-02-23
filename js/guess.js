var green = {name: "green", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var red = {name: "red", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var blue = {name: "blue", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var orange = {name: "orange", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};
var yellow = {name: "yellow", possiblePos: [], incorrectPos: [], correctPos: "", isInvalid:""};

var attempt = 1;

var correct;
var incorrect;
var invalid;

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
        //math()
        setColor(2, "red");
        setColor(3, "blue");
    }, 500);
}

function codeEnterConfirmed() {
    //console.log($("#direction").text())
    if (getKnownCount() == 4) {
        location.reload()
    } //guess I don't need an else after!!
    $("#topColorGrid").fadeOut();
    $("#direction").fadeOut();
    $("#confirmCodeEntered").fadeOut();
    $("#historyContainer").fadeOut(); //Back in below, maybe... a bit confusing!
    setTimeout(function () {
        addHistory() //Took me a while to find where to put this!
        $("#topStatusGrid").fadeIn();
        $("#confirmResusltsEntered").fadeIn()
        $("#direction").text("ENTER THE RESULTS BELOW:").fadeIn();
        //if ($("#historyContainer:hidden")) { //Fade in if hidden
        $("#historyContainer").fadeIn()
        //}
    }, 500);
    //Could put the 3 below in the grid itself, will have to rework CSS
    setStatus(5, "correct")
    setStatus(6, "incorrect")
    setStatus(7, "invalid")
    //console.log(color1.invalid);
}

function resultsEnterConfirmed() {
    correct = parseInt($("#correctNum :selected").val());
    incorrect = parseInt($("#incorrectNum :selected").val());
    invalid = parseInt($("#invalidNum :selected").val());

    var totalAttemptsEntered = correct+incorrect+invalid
    //console.log(slotAttemptColor)
    //console.log("Slots filled by algorithm: " + slotAttemptColor.filter(Boolean).length)
    if (totalAttemptsEntered != slotAttemptColor.filter(Boolean).length) {
        window.alert("You entered invalid results. Please input correct results or refresh the page to restart.")
    } else {
        $("#topStatusGrid").fadeOut();
        $("#confirmResusltsEntered").fadeOut();
        $("#direction").fadeOut();
        $("#historyContainer").fadeOut(); //Out and back in below
        setTimeout(function () {
            $("#topColorGrid").fadeIn();
            $("#direction").fadeIn();
            $("#confirmCodeEntered").fadeIn();
            $("#historyContainer").fadeIn(); //Like I said, back in!
            addHistoryStatus()
            $("#correctNum").val("0");
            $("#incorrectNum").val("0");
            $("#invalidNum").val("0");
        }, 500);
        tryColors = slotAttemptColor
        slotAttemptColor = []
        math() //Next attempt
    }
}

function setColor(slotNum, color) {
    var fuse = $("#" + color + "Fuse").clone()
    $("#slot" + slotNum).html(fuse)
    slotAttemptColor[slotNum] = color;
    //window["slot" + slotNum + "Attempt"] = color
}

function clearBoard() {
    for (i=1;i<5;i++) {
        $("#slot" + i).html("")
    }
}

function setStatus(slotNum, status) {
    var status = $("#" + status).clone()
    $("#slot" + slotNum).html(status)
    slotAttemptStatus[slotNum] = status;
}

function addHistory() {
    var history = $(".results:first").clone()
    for (i = 0; i < 4; i++) { //Not 3??
        //console.log("i: " + i)
        var fuse = $("#" + slotAttemptColor[i+1] + "Fuse").clone()
        history.find("label").eq(i).html(fuse) //Could also make 4 to 3 and make i-1 here and above remove +1
    }
    //console.log(correct)
    $("#historyList").append(history).hide().fadeIn()
}

function addHistoryStatus() {
    var history = $(".results:last");
    history.find("label").eq(4).text(correct);
    history.find("label").eq(5).text(incorrect);
    history.find("label").eq(6).text(invalid);
    correct = "";
    incorrect = "";
    invalid = "";
    tryColors = []
}

function complete() {
    $("#confirmCodeEntered").text("The code was cracked. Click to restart.")
    $("#direction").text("THE CODE WAS CRACKED")
}
