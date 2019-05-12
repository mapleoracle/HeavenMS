/* 
 * This file is part of the HeavenMS Maple Story Server
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


function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (status >= 0 && mode == 0) { 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
            cm.sendNext("#eHello! I am #dMapleOracle's#k gender bender."); 
        } else if (status == 1) { 
            cm.sendSimple("#eWhat gender would you like to be? It costs 10,000,000 mesos to change! Alien allows you to wear both #rmale#k + #rfemale#k equips, and some special rare equips.\r\n\r\n#b#L0#Male#l\r\n#L1#Female#l\r\n#L2#Alien#l"); 
        } else if (selection == 0) { 
            if (cm.getPlayer().getMeso() >= 10000000) { 
                if (cm.getPlayer().getGender() == 0) { 
                    cm.sendOk("#eYou are already a #rmale#k."); 
                    cm.dispose(); 
                } else { 
                    cm.sendOk("#eYou are now a #rMale#k.");
                    cm.getPlayer().setGender(0); 
                    cm.gainMeso(-10000000) 
                    cm.reloadChar(); 
                    cm.dispose(); 
                } 
            } else { 
                cm.sendOk("#eYou do not have 10,000,000 mesos."); 
                cm.dispose(); 
            } 
        } else if (selection == 1) { 
            if (cm.getPlayer().getMeso() >= 10000000) { 
                if (cm.getPlayer().getGender() == 1) { 
                    cm.sendOk("#eYou are already a #rFemale#k."); 
                    cm.dispose(); 
                } else { 
                    cm.sendOk("#eYou are now a #rFemale#k.");
                    cm.getPlayer().setGender(1); 
                    cm.gainMeso(-10000000) 
                    cm.reloadChar(); 
                    cm.dispose(); 
                } 
            } else { 
                cm.sendOk("#eYou do not have 10,000,000 mesos."); 
                cm.dispose(); 
            } 
        } else if (selection == 2) { 
            if (cm.getPlayer().getMeso() >= 10000000) { 
                                    

                if (cm.getPlayer().getGender() == 2) { 
                    cm.sendOk("#eYou are already an #rAlien#k."); 
                    cm.dispose(); 
                } else { 
                    cm.sendOk("#eYou are now an #rAlien#k.");
                    cm.gainMeso(-10000000) 
                    cm.getPlayer().setGender(2);
                    cm.reloadChar();
                    cm.dispose(); 
                } 
            } else { 
                cm.sendOk("#eYou do not have 10,000,000 mesos.");  
                cm.dispose(); 
            } 
        } 
    } 
}  