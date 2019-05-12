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

import client.MapleClient;
//import client.MapleClient;
import client.MapleCharacter;
import client.command.Command;
import server.maps.FieldLimit;

/**
 *
 * @author DarkyDev - Make it simple ;) 
 */
public class homeCommand extends Command {
    {
        setDescription("");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        player.saveLocationOnWarp();
        player.changeMap(5);
    }
}
