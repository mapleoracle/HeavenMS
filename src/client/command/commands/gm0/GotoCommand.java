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
package client.command.commands.gm0;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import constants.GameConstants;
import server.MaplePortal;
import server.maps.FieldLimit;
import server.maps.MapleMap;
import server.maps.MapleMiniDungeonInfo;

import java.util.HashMap;

public class GotoCommand extends Command {
    {
        setDescription("Go to command, Syntax: @goto <map name>, use @goto to se areas");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1){
            player.yellowMessage("Syntax: @goto <map name>, Areas: southperry,amherst,henesys,ellinia,perion,kerning,lith,sleepywood,florina,nautilus,ereve,rien,orbis,happy,elnath,ludi,aqua,leafre,mulung,herb,omega,korean,ellin,nlc,showa,shrine,ariant,magatia,singapore,quay,kampung,amoria,temple,square,neo,mushking");
            return;
        }
        
        if (!player.isAlive()) {
            player.dropMessage(1, "This command cannot be used when you're dead.");
            return;
        }

        if (!player.isGM()) {
            if (player.getEventInstance() != null || MapleMiniDungeonInfo.isDungeonMap(player.getMapId()) || FieldLimit.CANNOTMIGRATE.check(player.getMap().getFieldLimit())) {
                player.dropMessage(1, "This command can not be used in this map.");
                return;
            }
        }

        HashMap<String, Integer> gotomaps;
        if (player.isGM()) {
            gotomaps = new HashMap<>(GameConstants.GOTO_AREAS);     // distinct map registry for GM/users suggested thanks to Vcoc
        } else {
            gotomaps = new HashMap<>(GameConstants.GOTO_TOWNS);
        }
        
        if (gotomaps.containsKey(params[0])) {
            MapleMap target = c.getChannelServer().getMapFactory().getMap(gotomaps.get(params[0]));
            
            // expedition issue with this command detected thanks to Masterrulax
            MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
            player.saveLocationOnWarp();
            player.changeMap(target, targetPortal);
        } else {
//            player.dropMessage(5, "Area '" + params[0] + "' is not registered.");
            player.dropMessage(5, "Cant find area, "+ params[0]+", Areas: southperry,amherst,henesys,ellinia,perion,kerning,lith,sleepywood,florina,nautilus,ereve,rien,orbis,happy,elnath,ludi,aqua,leafre,mulung,herb,omega,korean,ellin,nlc,showa,shrine,ariant,magatia,singapore,quay,kampung,amoria,temple,square,neo,mushking");
        }
    }
}