/** 
 * 
 * @author  NmZero && System32 
 * name changer npc, originally made for v83 DukeMS 
 */ 

var status = -1; 
var donorPayment = 5; // amount of donation points (WITHOUT symbols) 
var donorPaymentWS = 10; // amount of donation points (WITH symbols) 
var votePayment = 10; // amount of vote points 
var eventPayment = 10; // amount of event points 
var regularPayment = [4000000, 10]; // itemid and amount 
var debug = false; 
var choice; 
var storage; 
var rules = [ 
    "Rule 1: No Racial slurs" , 
    "Rule 2: No impersonating GM's", 
    "Forbidden symbols are allowed in your name if you pay with donation points!" // you can add more rules yourself! 
]; 
var forbiddenWords = [ 
    " ", 
    "dev", 
    "developer", 
    "gfx", 
    "gm", 
    "coder", 
    "donor", 
    "sgm", 
    "owner", 
    "intern", 
    "dukems", 
    "dukestory", 
    "admin", 
    "adminstrator", 
    "supergm", 
    "gamemaster" // you can add more forbidden words yourself! 
]; 
var forbiddenSymbols = ["`","~","!","@","$","%","^","&","*","(",")","-","_","+","=","/","?",",",".","<",">",";",":","\"","'","[","]","{","}","|","#","€","£","¥"]; // lol those last 3 dont even exist in maple 

function start() { 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    (mode !== 1 && (status === 0 || status === 2) ? (status--, cm.dispose()) : (mode === 1 ? status++ : status--)); 
    if (status === 0) { 
        cm.sendSimple("Hey, for a small fee I can change your name!"+ 
        "\r\n#L1#Change my name!#l"+ 
        "\r\n#L2#Rules!#l"+ 
        "\r\n#L3#Forbidden words and symbols.#l"); 
    } else if (status === 1) { 
        if (selection === 1) { 
            cm.sendGetText("What do you want your new name to be?"); 
        } else if (selection === 2) { 
            var str = "#rRules:"; 
            for (var i = 0; i < rules.length; i++) 
                str += "\r\n\t"+cr()+""+rules[i]+""; 
            cm.sendOk(str); 
            debug = true; 
        } else if (selection === 3) { 
            var str = "#bForbidden words:#k"; 
            for (var i = 1; i < forbiddenWords.length; i++) { // start at 1, don't have to show the spacebar 
                str += "\r\n"+i+". "+forbiddenWords[i]+""; 
            } 
            str += "\r\n\r\n#bForbidden symbols:#k" 
            for (var x = 0; x < (forbiddenSymbols.length - 3); x++) // those last 3 symbols can bring people on ideas, lets not do that 
                str += "\r\n\t"+(x + 1)+". "+forbiddenSymbols[x]+""; // x + 1 so list doesn't start at 0 
            cm.sendOk(str); 
            debug = true; 
        } 
    } else if (status === 2) { 
        if (debug) { 
            cm.dispose(); 
        } else { 
            newName = cm.getText(); 
            if (isNameAllowed(newName.toLowerCase()) && cm.checkName(newName) === -1 && !hasSymbols(newName)) { 
                cm.sendSimple("The name #b"+newName+"#k is allowed.\r\nChange my name for (#rPick one#k):\r\n"+ 
                "#L0##b"+regularPayment[1]+" #i"+regularPayment[0]+"##l\r\n"+ 
                "#L1##b"+eventPayment+" #kEvent points#l\r\n"+ 
                "#L2##b"+votePayment+" #kVote points#l\r\n"+ 
                "#L3##b"+donorPayment+" #rDonor points#l"); 
                choice = "normal"; 
            } else if (isNameAllowed(newName.toLowerCase()) && cm.checkName(newName) === -1 && hasSymbols(newName)) { 
                cm.sendSimple("The name #b"+newName+"#k is allowed. But there were forbidden symbols found in your name, you may only pay with #rdonor#k points.\r\n"+ 
                "#L3#Change my name for #b"+donorPaymentWS+"#k #rdonor#k points#l\r\n"); 
                choice = "donor"; 
            } else { 
                if (cm.checkName(newName) !== -1) { 
                    cm.sendOk("New name is already in use"); 
                } else { 
                    cm.sendOk("New name is not allowed"); 
                } 
                debug = true; 
            } 
        } 
    } else if (status === 3) { 
        if (debug) { 
            cm.dispose(); 
        } else { 
            storage = selection; // i hate selection T_T 
            if ((selection === 2 && cm.getPlayer().getVotePoints() >= votePayment) || (selection === 1 && cm.getPlayer().getEventPoints() >= eventPayment) || (choice === "normal" && selection === 3 && cm.getPlayer().getDonationPoints() >= donorPayment) || (selection === 0 && cm.haveItem(regularPayment[0], regularPayment[1])) || (choice === "donor" && selection === 3 && cm.getPlayer().getDonationPoints() >= donorPaymentWS)) { 
                cm.sendYesNo("Are you sure that you want to change your name to #b"+newName+"#k?"); 
            } else { 
                cm.sendOk("You couldn't pay up!"); 
                cm.dispose(); 
            } 
        } 
    } else if (status === 4) { 
        if (debug) { 
            cm.dispose(); // should never happen, so idk why :P 
        } else { 
            if (isNameAllowed(newName.toLowerCase()) && cm.checkName(newName) === -1) { // without the second check 2 people might get the same name if timing is extremely lucky (or unlucky however you wanna see it) 
                if (choice === "normal") { 
                    if (storage === 0) { 
                        cm.gainItem(regularPayment[0], -regularPayment[1]); 
                    } else if (storage === 1) { 
                        cm.getPlayer().gainEventPoints(-eventPayment); 
                    } else if (storage === 2) { 
                        cm.getPlayer().gainVotePoints(-votePayment); 
                    } else if (storage === 3) { 
                        cm.getPlayer().gainDonationPoints(-donorPayment); 
                    } 
                    changeName(newName); 
                } else if (choice === "donor") { 
                    cm.getPlayer().gainDonationPoints(-donorPaymentWS); 
                    changeName(newName); 
                } 
            } else { 
                cm.sendOk("Somebody already got your name (something might have gone wrong the first check, or somebody got your name like 5 seconds before you!)."); 
                cm.dispose(); 
            } 
        } 
    } 
} 

function isNameAllowed(name) { 
    if (name.length < 4) { 
        return false; 
    } 
    for (var i = 0; i < forbiddenWords.length; i++) { 
        if (name.indexOf(forbiddenWords[i]) !== -1) { 
            return false; 
        } 
    } 
    return true; 
} 

function changeName(name) { 
    cm.changeName(name); 
    cm.dc(); 
    cm.dispose(); // maybe if the dc doesnt work? 
} 

function hasSymbols(name) { 
    for (var i = 0; i < forbiddenSymbols.length; i++) { 
        if (name.indexOf(forbiddenSymbols[i]) !== -1) { 
            return true; // yes, true 
        } 
    } 
    return false; // yes, false 
} 

function cr() { // ty fraysa 
    var colors = ["b", "d", "g", "r", "k"]; 
    return "#" + colors[(Math.floor(Math.random() * 5))]; 
}  