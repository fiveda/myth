export function loadStage(){
	creatMenuStage();
}

function creatMenuStage(){
	var MenuContainer = new createjs.Container();
	var MenuBackGround = new createjs.Bitmap("images/normalstage/select00.png");
	var MenuTitle = new createjs.Bitmap("images/normalstage/title_logo.png");
		MenuTitle.sourceRect=new createjs.Rectangle(0, 0, 256, 180);
		MenuTitle.x=50;
		MenuTitle.y=50;
	var MenuTitleBack = MenuTitle.clone();
		MenuTitleBack.sourceRect = new createjs.Rectangle(256, 0, 256, 256);
		MenuTitleBack.x=50;
		MenuTitleBack.y=20;
	MenuContainer.addChild(MenuBackGround,MenuTitleBack,MenuTitle)
	stage.addChild(MenuContainer);
	
}

function creatBattleStage(stageNum){
	
}