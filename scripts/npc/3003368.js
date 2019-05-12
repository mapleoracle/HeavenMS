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

var bossmaps = Array(100000005, 105070002, 105090900, 230040420, 280030000, 220080001, 240020402, 240020101, 801040100, 240060200); // Someone else's House, The Grave of Mushmom, The cursed Sanctuary, The Cave of Pianus, Zakums Altar, Origin of Clocktower, Manons Forest, Griffey Forest, The Nightmarish Last Days, Horntails Cave
var monstermaps = Array(100040001, 101010100, 104040000, 103000101, 103000105, 101030110, 106000002, 101030103, 101040001, 101040003, 101030001, 104010001, 105070001, 105090300, 105040306, 230020000, 230010400, 211041400, 222010000, 220080000, 220070301, 220070201, 220050300, 220010500, 250020000, 251010000, 200040000, 200010301, 240020100, 240040500, 240040000, 600020300, 801040004, 800020130); // Dungeon Southern Forest I, Tree that Grew 1, Henesys Hunting Ground 1, Line 1 Area 1, Line 1 Area 4, Camp 1, Dangerous Valley II, Excavation Site III, Land of Wild Boar, Iron Boar Land, The Land of Wild Boar II, The Pig Beach, Ant Tunnel Park, Drakes Meal Table, The Forest of Golem, Forked Road: East Sea, Forked Road: West Sea, Forest of Dead Trees 4, Entrance to Black Mountain, Deep Inside the Clock Tower, Forbidden Time, Lost Time, Path of Time, Terrace Hall, Practice Field, Beginner, 10-Year-Old Herb Garden, Cloud Park 3, Garden of Darkness 1, Battlefield of Fire & Darkness, Entrance to Dragon Nest, The Dragon Canyon, Wolf Spider Cavern, Armory, Encounter with the Budda, 
var townmaps = Array(100000000, 680000000, 230000000, 101000000, 211000000, 100000000, 100000000, 251000000, 103000000, 222000000, 104000000, 240000000, 220000000, 250000000, 800000000, 600000000, 221000000, 200000000, 102000000, 801000000, 105040300, 100000000); // Amherst, Amoria, Aquarium, Ellinia, El Nath, Entrance - Mushroom Town Training Camp, Henesys, Herb Town, Kerning City, Korean Folk Town, Leafre, Lith Harbor, Ludibrium, Mu Lung, Mushroom Shrine, New Leaf City, Omega Sector, Orbis, Perion, Showa Town, Sleepywood, Southperry
var chosenMap = -1;
var monsters = 0;
var towns = 0;
var bosses = 0;
importPackage(net.sf.odinms.client);
function start() {
 status = -1;
 action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 3 && mode == 0) {
   cm.sendOk("See you next time!.");
   cm.dispose();
   return;                    
                }
                if (mode == 1) {
   status++;
  }
  else {
   status--;
  }
               if (status == 0) {
                        cm.sendNext("Hey I'm MapleOracle's Teleporter!");                  
                }
               if (status == 1) {
                   cm.sendSimple("#L0#World Class Teleporter#l\r\n#L1#Nothing#l");
               }
               else if (status == 2) {
                   if (selection == 0) {
                       cm.sendSimple("#L0#Towns#l\r\n#L1#BossMaps#l\r\n#L2#Leave#l");
                   }
                   else if (selection == 1) {
                       cm.dispose();
                   }
               }
               else if (status == 3) {
   if (selection == 0) {
                         cm.sendGetText("Where would you like to go? \r\n #bTowns#k\r\n \r\n Henesys\r\n Kerning\r\n Perion\r\n Ellinia\r\n Sleepywood\r\n Orbis\r\n Ludi\r\n ElNath\r\n Omega\r\n KFT\r\n Aqua\r\n Leafre\r\n MuLung\r\n HerbTown\r\n NLC\r\n Amoria\r\n \r\n Please type your selection here. (#bCaps Count#k)");
                        towns = 1;
  } if (selection == 1) {
                  cm.sendGetText("Where would you like to go? \r\n #bBosses#k\r\n \r\n Mushmom\r\n Zombie Mushmom\r\n Balrog\r\n Pianus\r\n Zakum\r\n Papu\r\n Manon\r\n Griffey\r\n Horseman\r\n Horntail\r\n Crow\r\n \r\n Please type your selection here. (#bCaps Count#k)");
            bosses = 1;
             } if (selection == 2) {
                       cm.dispose();
                   }
               }
            else if (status == 4) {
                if (towns == 1) {
                if (cm.getText().equals("Henesys")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(100000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Kerning")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(103000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Perion")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(102000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Ellinia")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(101000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Sleepywood")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(105040300, 0);
  cm.dispose();
  } else if (cm.getText().equals("Orbis")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(200000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("ElNath")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(211000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Ludi")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(220000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Omega")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(221000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("KFT")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(222000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Aqua")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(230000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Leafre")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(240000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("MuLung")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(250000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("HerbTown")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(251000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("NLC")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(600000000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Amoria")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(680000000, 0);
  cm.dispose();
  } else {
  cm.sendOk("Please try again.");
  cm.dispose();
        }
              } else if (monsters == 1) {
                cm.sendYesNo("Do you want to go to #m" + monstermaps[selection] + "#?");
                chosenMap = selection;
                monsters = 2;
                }
                else if (bosses == 1) {
  if (cm.getText().equals("Mushmom")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(100000005, 0);
  cm.dispose();
  } else if (cm.getText().equals("Zombie Mushmom")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(105070002, 0);
  cm.dispose();
  } else if (cm.getText().equals("Balrog")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(105090900, 0);
  cm.dispose();
  } else if (cm.getText().equals("Pianus")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(230040420, 0);
  cm.dispose();
  } else if (cm.getText().equals("Zakum")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(280030000, 0);
  cm.dispose();
  } else if (cm.getText().equals("Papu")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(220080001, 0);
  cm.dispose();
  } else if (cm.getText().equals("Manon")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(240020402, 0);
  cm.dispose();
  } else if (cm.getText().equals("Griffey")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(240020101, 0);
  cm.dispose();
  } else if (cm.getText().equals("Horseman")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(801040100, 0);
  cm.dispose();
  } else if (cm.getText().equals("Horntail")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(240060200, 0);
  cm.dispose();
  } else if (cm.getText().equals("Crow")) {
  cm.sendOk("Press Ok to be warped.");
  cm.warp(800020130, 0);
  cm.dispose();
  } else {
  cm.sendOk("Please try again.");
  cm.dispose();
    }
                }
            }
            else if (status == 5) {
                if (towns == 2) {
                    cm.warp(townmaps[chosenMap], 0);
                    cm.dispose();
                }
                else if (monsters == 2) {
                    cm.warp(monstermaps[chosenMap], 0);
                    cm.dispose();
                }
                else if (bosses == 2) {
                    cm.warp(bossmaps[chosenMap], 0);
                    cm.dispose();
                }
            }
 
            }
}
