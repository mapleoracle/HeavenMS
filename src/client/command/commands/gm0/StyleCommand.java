package client.command.commands.gm0;

import client.MapleClient;
import client.command.Command;

/**
 * @author DarlyDev
 */

public class StyleCommand extends Command {
    {
        setDescription("");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        client.getAbstractPlayerInteraction().openNpc(9201015, "style");
    }
}
