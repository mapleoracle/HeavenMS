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
//Fuck this
package client.command.commands.gm2;

import client.command.Command;
import client.MapleClient;
import client.MapleCharacter;
import client.MapleStat;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;

import java.util.Arrays;
import java.util.List;


public class TagCommand extends Command {
    {
    setDescription("Game of tag...");
}
    @Override
    
        public void execute(MapleClient c, String[] params) {
            MapleCharacter player = c.getPlayer();
            MapleMap map1 = player.getMap();
            List<MapleMapObject> players = map1.getMapObjectsInRange(player.getPosition(), (double) 10000, Arrays.asList(MapleMapObjectType.PLAYER));
            for (MapleMapObject closeplayers : players) {
                MapleCharacter playernear = (MapleCharacter) closeplayers;
                if (playernear.isAlive());
                {
                    if (!playernear.isGM()) {
                        playernear.setHp(0);
                        playernear.updateSingleStat(MapleStat.HP, 0);
                        playernear.dropMessage(5, "Tagged");
                    }
                }
            }
        }
}