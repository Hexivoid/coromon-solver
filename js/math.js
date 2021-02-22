//This deserves its own file!
var finalColors = []
var tryColors = [] //The color in what slot (index)
var tryCombo;
var twoDone = {status: false, firstColor: "", firstNum: "", secondColor: "", secondNum: ""}

var slot1 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot2 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot3 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot4 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}

function math() {
    clearBoard()
    if (getNumOfSlotsFilled() == 2) {
        if (correct == 2) { //Both 2/2 are correct
            setKnown(findSlotFilled(1), tryColors[findSlotFilled(1)])
            setKnown(findSlotFilled(2), tryColors[findSlotFilled(2)])
            findOnesPossibilities()
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
        } else if (incorrect == 2) {
            removeColor(findSlotFilled(1), tryColors[findSlotFilled(1)])
            removeColor(findSlotFilled(2), tryColors[findSlotFilled(2)])
            findOnesPossibilities()
            setColor(firstEmptySlot(), tryColors[findSlotFilled(1)]);
        }
    } else if (getNumOfSlotsFilled() == 1) {
        if (correct == 1) {
            //console.log("awww " + tryColors[findSlotFilled(1)])
            setKnown(findSlotFilled(1), tryColors[findSlotFilled(1)])
            findOnesPossibilities()
            console.log("test " + firstEmptySlot())
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
        } else if (incorrect == 1) {
            removeColor(findSlotFilled(1), tryColors[findSlotFilled(1)])
            findOnesPossibilities()
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
        }
    }






    //console.log("getKnownCount() " + getKnownCount())
    console.log(slot1)
    console.log(slot2)
    console.log(slot3)
    console.log(slot4)
}

function findOnesPossibilities() {
    var colors = ["red", "blue", "green", "orange", "yellow"]
    for(i = 0; i < 2; i++) {
        for (var c = 1; c < 6; c++){
            if (getPossibleSlotsForColor(colors[c]).length == 1) { //
                for (var s = 1; s < 5; s++) {
                    if (window["slot" + s].possible.includes(colors[c]) == true) {
                        setKnown(s, colors[c])
                        console.log("found")
                    }
                }
            } //Below if is not invalid and can only be in one slot
            /*var count = 0;
            var s;
            var indexSlot;
            for (s = 1; s < 5; s++) {
                if (window["slot" + s].possible.includes(colors[c]) == true) {
                    count++;
                    indexSlot = s;
                }
            }
            if (count == 1) {
                removeFromArray(window["slot" + indexSlot].possible, colors[c])
            }*/
        }
    }
}






function getPossibleSlotsForColor(color) {
    var count = 0;
    for (var i = 1; i < 5; i++) {
        if (window["slot" + i].possible.includes(color) == true) {
            count++;
        }
    }
    return count;
}















    /*if (correct == 2) { //If slot 2 is red and slot 3 blue

        setKnown(2, "red")
        setKnown(3, "blue")
        setColor(1, "green");

    } else if (correct == 1) {

        if (incorrect == 1) { //If one correct and one incorrect

            setColor(2, "red");

        } else if (invalid == 1) {

        }
    } else if (getKnownCount() > 1) {
        //console.log("first slot: " + firstEmptySlot())
        //console.log(getKnownCount());
        if (getKnownCount() == (2 || 3)) {
            if (correct == 1) {
                console.log("is correct")
                setKnown(firstEmptySlot(), window["slot"+firstEmptySlot()].possible[0])
                //removeColor(firstEmptySlot(), window["slot"+firstEmptySlot()].possible[0])
                console.log("labeled as correct")
            }
            var emptySlot = firstEmptySlot()
            var colorToTry = window["slot"+emptySlot].possible[0]
            setColor(emptySlot, colorToTry);
        } else if (getKnownCount() == 4) {
            console.log("set to correct")
        }
    } else {

        //console.log("getKnownCount: " + getKnownCount())







    }







    /*console.log(slot1)
    console.log(slot2)
    console.log(slot3)
    console.log(slot4)*/


function removeColor(slot, color) {
    slotVar = window["slot" + slot]
    removeFromArray(slotVar.possible, color)
    if (slotVar.possible.length == 1) { //If only one possibility left
        setKnown(slot, slotVar.possible[0])
    }
}

function setKnown(slot, color) {
    slotVar = window["slot" + slot]
    slotVar.possible = []
    slotVar.known = true
    finalColors[slot] = color
    for (var s = 1; s < 5; s++) {
        if(window["slot" + s].possible.includes(color)) {
            removeFromArray(window["slot" + s].possible, color)
        }
    }
}

function firstEmptySlot() {
    for (var s = 1; s < 5; s++) {
        if(window["slot" + s].known == false) {
            return s
            s = 6 //Exits loop
        }
    }
}

function getKnownCount() { //Number of slots known
    var known = 0; //Maybe return finalColors.filter(Boolean).length?
    for (var s = 1; s < 5; s++) {
        if(window["slot" + s].known == true) {
            known++
        }
    }
    return known;
}

function getNumOfSlotsFilled() {
    var numFilled = 0;
    for (var i = 0; i < 4; i++) {
        if($(".results:last").find("label").eq(i).html() != "") {
            numFilled++;
        }
    }
    return numFilled;
}

function findSlotFilled(filledSlotNum) { //i.e. for attempt 1 will return 2 for first slot and 3 for second (red > blue)
    var filledSlotCount = 0;
    for (var i = 0; i < 4; i++) {
        if($(".results:last").find("label").eq(i).html() != "") {
            filledSlotCount++;
            if (filledSlotCount == filledSlotNum) {
                return i + 1; //Since index is minus one, don't change this lol
                i = 5;
            }
        }
    }
}

var possibleColors = ["green", "red", "blue", "orange", "yellow"]
var remainingSlots = [1, 2, 3, 4]

function removeFromArray(arrayInput, toRemove) {
    var index = arrayInput.indexOf(toRemove)
    if (index != null) {
        arrayInput.splice(index, 1)
    }
}
