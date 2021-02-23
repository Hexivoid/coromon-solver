//This deserves its own file!
var finalColors = []
var tryColors = [] //The color in what slot (index)
var tryCombo;
var colors = ["red", "blue", "green", "orange", "yellow"]
var foundInvalid = false;

var slot1 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot2 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot3 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}
var slot4 = {known: false, possible: ["red", "blue", "green", "orange", "yellow"]}

function math() {
    clearBoard()
    findOnesPossibilities()
    console.log("known num: " + getKnownCount())
    console.log("finalColors: " + finalColors)
    if (getKnownCount() == 3) {
        if (invalid == 1) {
            console.log("4")
            removeColorFromAll(tryColors[findSlotFilled(1)])
        } else if (correct == 1) {
            setKnown(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0])
        }
        console.log("1")
        if (window["slot" + firstEmptySlot()].possible.length == 2) {
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
            console.log("2")
        } else { //If only one option left and whole combo is known!!!
            console.log("3")
            setKnown(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0])
            for (var s = 1; s < 5; s++) {
                setColor(s, finalColors[s]);
                complete()
            }
        }
    } else if (getKnownCount() == 2) {
        console.log("Adggda " + window["slot" + firstEmptySlot()].possible.length)
        if (correct == 1) {
            setKnown(firstEmptySlot(), tryColors[findSlotFilled(1)]) //Or findSlotFilled(1) for first parameter
            findOnesPossibilities()
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
        } else if (incorrect == 1) {
            removeColor(findSlotFilled(1), tryColors[findSlotFilled(1)])
            setKnown(secondEmptySlot(), tryColors[findSlotFilled(1)]) //check this and line above
            findOnesPossibilities()
            if (foundInvalid == true) {
                setKnown(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0])
            } else if (foundInvalid == false) {
                setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
            }
        } else if (invalid == 1) {
            removeColorFromAll(tryColors[findSlotFilled(1)])
            console.log("setting")
            setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
        }
    } else {
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
            } else if (invalid == 1) { //Bottom can't be correct, already mentioned above
                findOnesPossibilities()
                if (foundInvalid == false) {
                    console.log(tryColors)
                    setColor(firstEmptySlot(), tryColors[findSlotFilled(1)]);
                    setColor(secondEmptySlot(), window["slot" + firstEmptySlot()].possible[2]);
                } else if (foundInvalid == true) {
                    setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
                }
            } else if (correct == 1) {
                if (incorrect == 1) {
                } else if (invalid == 1) {
                }
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
            } else if (invalid == 1) {
                removeColorFromAll(tryColors[findSlotFilled(1)])
                findOnesPossibilities()
                setColor(firstEmptySlot(), window["slot" + firstEmptySlot()].possible[0]);
            }
        }
    }







    //console.log("getKnownCount() " + getKnownCount())
    console.log(slot1)
    console.log(slot2)
    console.log(slot3)
    console.log(slot4)
}

function findOnesPossibilities() {
    removeInvalids()
    for(i = 0; i < 2; i++) {
        if (foundInvalid == true) {
            for (var c = 1; c < colors.length+1; c++){
                //console.log("is " + colors[c-1] + " "+ getPossibleSlotsForColor(colors[c-1]))
                if (getPossibleSlotsForColor(colors[c-1]) == 1) { // If color can only be in one slot find the slot
                    console.log("woooh")
                    for (var s = 1; s < 5; s++) {
                        if (window["slot" + s].possible.includes(colors[c-1]) == true) {
                            //console.log("knownasf : " + s + " " + colors[c-1])
                            setKnown(s, colors[c-1])
                            //console.log("found")
                        }
                    }
                }
            }
        }
    }
}

function removeInvalids() {
    var prevInvalidCount= $(".results").last().prev().find("label").eq(6).html() //Seeing if there was one invalid last time
    if (prevInvalidCount == 1) {
        var oldColors = [] //Previous colors to check
        for (var s = 0; s < 4; s++) { //Adds the previous colors to oldColors, probs had an easier way of doing this
            var oldColorTemp = $(".results").last().prev().find("label").eq(s).html()
            if (oldColorTemp != "") {
                oldColors[s+1] = getColorFromHTML(oldColorTemp)
            } else { //Avoids stuff below to make sure slots ain't undefined?
                oldColors[s+1] = ""
            }
        }
        for (var i = 1; i < 4; i++) {
            for (var a = 1; a < 4; a++ ) { //Loops old and new colors to compare

                if (tryColors[i] != undefined && oldColors[a] != undefined) { //Or ""?

                    if (tryColors[i] == oldColors[a]) { //When match found see if result was invalid or not
                        foundInvalid = true;
                        console.log("found it " + tryColors[i] + " " + oldColors[a])
                        if (invalid == 1) { //If color is found in both before and now and still is invalid, remove it
                            console.log(oldColors[a] + " invalid ")
                            removeColorFromAll(oldColors[a])
                        } else { //Both correct or incorrect, remove the other number from last try
                            console.log(oldColors[a] + " invalid ")
                            removeFromArray(oldColors, oldColors[a])
                            removeColorFromAll(oldColors[oldColors.indexOf(oldColors[a])])
                        }
                    }
                }

            }
        }
    }
}

function getColorFromHTML(html) {
    var colorChoices = ["red", "blue", "green", "orange", "yellow"]
    for (var c = 0; c < 5; c++) {
        if (html.includes(colorChoices[c])) {
            return colorChoices[c]
        }
    }
}

function getPossibleSlotsForColor(color) { //Returns the number of slots that have the color as possible
    var count = 0;
    for (var i = 1; i < 5; i++) {
        if (window["slot" + i].possible.includes(color) == true) {
            count++;
        }
    }
    return count;
}

function removeColor(slot, color) {
    slotVar = window["slot" + slot]
    removeFromArray(slotVar.possible, color)
    if (slotVar.possible.length == 1) { //If only one possibility left
        setKnown(slot, slotVar.possible[0])
    }
}

function setKnown(slot, color) {
    console.log("known " + slot + " " + color);
    slotVar = window["slot" + slot]
    slotVar.possible = []
    slotVar.known = true
    finalColors[slot] = color
    console.log("ADFFDADFFDA " + finalColors[slot])
    removeColorFromAll(color)
}

function removeColorFromAll(color) { //Removes color from all possibles
    console.log("removing " + color)
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

function secondEmptySlot() {
    var found = 0;
    for (var s = 1; s < 5; s++) {
        if(window["slot" + s].known == false) {
            found++
            if (found == 2) {
                return s;
                s = 6 //Exits loop
            }
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
