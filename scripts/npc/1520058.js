/* 
 * This file is part of the MapleOracle Maple Story Server
 *
 * Copyright (C) 2019 Administrator
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


var status;

function start() { // starts the NPC
    status = -1; // sets the status of the NPC to -1
    action(1, 0, 0); // sets the mode to 1, type to 0, and selection to 0 for the NPC
} // closes off the start function

function action(mode, type, selection) { // calls what you set above in function start, almost all actions are done here
    if (mode == 1) { // the mode is set to 1 because of the function start, as shown above
        status++; // advances the NPC to the next status, in this case, status 0
    }else{ // if mode does not equal 1
        cm.dispose(); // does not advance the NPC to the next status.
        return;
    }
    
    if (status == 0) {
        cm.sendNext("Hello Mapler, I am capable of granting you the GM Job.");
    } else if (status == 1 ) {
        cm.sendNext("To be granted the GM Job, you need to have reached level 200 and at least 100 rebirths!");
    } else if (status == 2 ) {
        cm.sendYesNo("Do you want to be granted the GM Job?");
    } else if (status == 3) {
        if (type == 1 && mode == 1) {
            if (cm.getJobId() == 900 || cm.getJobId() == 910) {
                cm.sendOk("The GM Job has already been granted to you.");
                cm.dispose();
            } else if (cm.getChar().getLevel() == 200 && cm.getChar().getReborns() >= 100) {
                cm.changeJobById(900);
                cm.sendOk("You have been granted the GM Job!");
                cm.dispose();
            } else {
                cm.sendOk("You do not meet the necessary requirements.");
                cm.dispose();
            }
        } else if (type == 1 && mode != 1) {
            cm.sendOk("Okay, come see me when you change your mind.");
            cm.dispose();
        }
    }
}


// Made and Fixed by Ultimaciel