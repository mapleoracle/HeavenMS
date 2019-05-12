package net.server.channel.handlers;

import client.*;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class EnterMTSHandler extends AbstractMaplePacketHandler {

@Override
public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
if (!c.getPlayer().isAlive()) {
c.getSession().write(MaplePacketCreator.enableActions());
return;
}
c.getAbstractPlayerInteraction().openNpc(200);
}
}