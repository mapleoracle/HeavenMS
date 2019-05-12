/* Yet Another MSI NPC v12
By Splizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Description:
This NPC is obviously meant to transform an item from a players inventory into one that has 
maximum stats plus optional other benefits. To set the parameters on how the player is to
acquire this item just change the variables that are at the top of the script.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ChangeLog:
Originally developed for ForestStory although it was never used :P http://foreststory.zapto.org/?page=home (Splizes)
v00 initial release (Splizes)
v01 disallowed getting a max stat item if your equip inventory has 0 slots. This is probably useless but it might prevent some problems. (Splizes)
v02 fixed a problem with the stat editor. (Splizes)
v03 added forcezeroslots which gets rid of upgrade slots possibly preventing negative stats. (Splizes)
v04 added stat randomization option (credits VincentOL of ForestStory for idea). (Splizes)
v04_1 added signItem boolean.
v05 added stat randomization for individual stats (Edited by VincentOL) This npc will probably be used in Foreststory. (VincentOL)
v06 fixed individual stat randomization, fixed bugs, optimized individual stat randomization. (Splizes & VincentOL)
v07 slight optimization (movement of permenant watk variable to temporal version in script) and renaming of variables. (Splizes)
v08 fixed a major bug that occured when the player had no equipment. (Splizes)
v08_1 fixed a bug due to v08. (Splizes)
v09 added both hands and avoidability (Splizes)
v10 added individual item-based 0slotification lol (Splizes)
v11 added randomization on hands and avoidability and added both wepdef and magdef
v12 added an individual stat option... hopefully adding what fdinufdinu wanted...
v13 used my first function! shortened the code by adding setZeroSlotByItemType <3
v13_1 improved the slot stuff slightly.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
importPackage(Packages.client); 

var status = 0;
var selected = 1;
var wui = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    selected = selection;
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
            cm.sendAcceptDecline("Hey, Welcome to #rYOURPRIVATESERVERNAME#k Max Stat Item NPC!#k\r\n#rPlease Meet these Requirements to get a max stat item: \r\n\r\n#b32,767 Stats in all#k\r\n#b2 Vote Points");
        } else if (status == 1) {
            if (cm.getPlayer().getStr() > 32766 && cm.getPlayer().getDex() > 32766 && cm.getPlayer().getInt() > 32766 && cm.getPlayer().getLuk() > 32766 && cm.getPlayer().getVotePoints() > 1){
                var String = "Please Choose your desired item or nx you want as your new MSI. Please check your Inventory to make sure you have enough room because, we don't give back refunds.Enjoy!\r\n\r\n";
                cm.sendSimple(String+cm.EquipList(cm.getC()));
            } else  {
                cm.sendOk ("Fuck off you slut.");
                cm.dispose(); 
            }
        } else if (status == 2) { 
            cm.MakeGMItem(selected, cm.getP());
            cm.getPlayer().setStr(4); cm.getPlayer().setDex(4); cm.getPlayer().setLuk(4); cm.getPlayer().setInt(4);
            cm.getPlayer().gainVotePoints(-2); 
            cm.reloadChar();
            cm.dispose();    
        }            
        if (selection == 1) {
            cm.sendOk("Bye Baby <3");
            cm.dispose();
        }
    }
    }