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
import server.MapleItemInformationProvider;
import server.life.MapleMonsterInformationProvider;
import server.life.MonsterDropEntry;
import tools.MaplePacketCreator;
import tools.Pair;

import java.util.Iterator;

public class WhatDropsFromCommand extends Command {
    {
        setDescription("");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.dropMessage(5, "Please do @whatdropsfrom <monster name>");
            return;
        }
        String monsterName = player.getLastCommandMessage();
        String output = "";
        int limit = 3;
        Iterator<Pair<Integer, String>> listIterator = MapleMonsterInformationProvider.getMobsIDsFromName(monsterName).iterator();
        for (int i = 0; i < limit; i++) {
            if(listIterator.hasNext()) {
                Pair<Integer, String> data = listIterator.next();
                int mobId = data.getLeft();
                String mobName = data.getRight();
                output += mobName + " drops the following items:\r\n\r\n";
                for (MonsterDropEntry drop : MapleMonsterInformationProvider.getInstance().retrieveDrop(mobId)){
                    try {
                        String name = MapleItemInformationProvider.getInstance().getName(drop.itemId);
                        if (name == null || name.equals("null") || drop.chance == 0){
                            continue;
                        }
                        float chance = 1000000 / drop.chance / (!MapleMonsterInformationProvider.getInstance().isBoss(mobId) ? player.getDropRate() : player.getBossDropRate());
                        output += "- " + name + " (1/" + (int) chance + ")\r\n";
                    } catch (Exception ex){
                        ex.printStackTrace();
                        continue;
                    }
                }
                output += "\r\n";
            }
        }
        
        c.getAbstractPlayerInteraction().npcTalk(9010000, output);
    }
}
