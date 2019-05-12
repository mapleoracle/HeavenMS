/**
 * @Id: 9900001
 * @Npc: NimaKin
 * @Map: 180000000
 * @Function: GM Npc
 */
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(m, t, s) {
    if (m== -1) 
        cm.dispose();
    else {
        if (m == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (m == 1) status++;
        else status--;
        if (status == 0){
            cm.sendSimple("Hey there! I could change the you stats! What would you like to change?\r\n#b#L0#Level Up#l\r\n#L1#Max Masteries#l\r\n#L2#Max Skills#l\r\n#L3#Become GM#l\r\n#L4#Change Level#l");
        }else if (status == 1){
            if (s == 0) cm.levelUp();
            else if (s == 1) cm.maxMasteries();
            else if (s == 2) cm.maxSkills();
            else if (s == 3) cm.changeJob(500);
            else if (s == 4){
                cm.sendGetText("Enter an level?");
                status++;
            }
        }else if (status == 2) {
            cm.sendOk("Enjoy!");
            cm.dispose();
        }else if (status == 3) {
            var newlevel=parseInt(cm.getText());
            if(isNaN( newlevel)){
                cm.sendOk("Please enter an integer between 1 to 200!");
                cm.dispose();
            }else{
                cm.sendOk("Enjoy!");
                cm.setLevel(newlevel);
                cm.dispose();
            }
        }
    }
}