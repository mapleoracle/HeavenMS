/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* Author: Xterminator
	NPC Name: 		Desc
	Map(s): 		Everywhere
	Description: 		Everything
NPC IDS: Fredrick (9030000)

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
        status--; // does not advance the NPC to the next status. 
    } 
     
    if (status == 0) { // if mode was 1, status would move from -1 to 0. If status is 0, these actions will happen 
        cm.sendSimple("Hello. I am #bDesc#k from #bMapleOracle#k. What can i do for you today? \r\n #L0# All in one shop #l \r\n #L1# No, I'm not. #l"); // Opens a window with 2 choices (selections) 
    } else if (status == 1) { // NPC advances to next status if a selection is chosen. 
        if (selection == 0) { // selection 0 is #L0#, "Yes, I am." 
                cm.openNpc(9030000);
                cm.dispose();
            } 
        } else if (selection == 1) { // "No, I'm not." 
            cm.sendOk("Okay bye"); 
            cm.dispose(); 
        } 
    } 
