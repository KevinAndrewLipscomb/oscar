
function LoadSld( slideId )
{
	if( !g_supportsPPTHTML ) return
	if( slideId )
		parent.SldUpdated(slideId)
	g_origSz=parseInt(SlideObj.style.fontSize)
	g_origH=SlideObj.style.posHeight
	g_origW=SlideObj.style.posWidth
	g_scaleHyperlinks=(document.all.tags("AREA").length>0)
	if( g_scaleHyperlinks )
		InitHLinkArray()
	if( g_scaleInFrame||(IsWin("PPTSld") && parent.IsFullScrMode() ) )
		document.body.scroll="no"
	_RSW()
	if( IsWin("PPTSld") && parent.IsFullScrMode() )	{
		document.oncontextmenu=parent._CM;
		self.focus()
	}
}
function MakeSldVis( fTrans ) 
{
	fTrans=fTrans && g_showAnimation
	if( fTrans )
	{
		if( g_bgSound ) {
			idx=g_bgSound.indexOf(",");
			pptSound.src=g_bgSound.substr( 0, idx );
			pptSound.loop= -(parseInt(g_bgSound.substr(idx+1)));
		}
		SlideObj.filters.revealtrans.Apply()
	}
	SlideObj.style.visibility="visible"
	if( fTrans )
		SlideObj.filters.revealtrans.Play()
}
function MakeNotesVis() 
{
	if( !IsNts() ) return false 
	SlideObj.style.display="none"
	nObj = document.all.item("NotesObj")
	parent.SetHasNts(0)
	if( nObj ) { 
		nObj.style.display=""
		parent.SetHasNts(1)
	}
	return 1
}
function Redirect( frmId,sId )
{
	var str=document.location.hash,idx=str.indexOf('#')
	if(idx>=0) str=str.substr(1);
	if( window.name != frmId && ( sId != str) ) {
		obj = document.all.item("Main-File")
		window.location.href=obj.href+"#"+sId
		return 1
	}
	return 0
}
function HideMenu() { if( frames["PPTSld"] && PPTSld.document.all.item("ctxtmenu") && PPTSld.ctxtmenu.style.display!="none" ) { PPTSld.ctxtmenu.style.display='none'; return true } return false }
function IsWin( name ) { return window.name == name }
function IsNts() { return IsWin("PPTNts") }
function IsSldOrNts() { return( IsWin("PPTSld")||IsWin("PPTNts") ) }
function SupportsPPTAnimation() { return( navigator.platform == "Win32" && navigator.appVersion.indexOf("Windows")>0 ) }
function SupportsPPTHTML()
{
	var appVer=navigator.appVersion, msie=appVer.indexOf("MSIE "), ver=0
	if( msie >= 0 )
		ver=parseFloat( appVer.substring( msie+5, appVer.indexOf(";",msie) ) )
	else
		ver=parseInt(appVer)

	return( ver >= 4 && msie >= 0 )
}
var MHTMLPrefix = CalculateMHTMLPrefix(); 
function CalculateMHTMLPrefix()
{
	if ( document.location.protocol == 'mhtml:') { 
		href=new String(document.location.href) 
		Start=href.indexOf('!')+1 
		End=href.lastIndexOf('/')+1 
		if (End < Start) 
			return href.substring(0, Start) 
		else 
		return href.substring(0, End) 
	}
	return '';
}

function _RSW()
{
	if( !g_supportsPPTHTML || IsNts() ||
	  ( !g_scaleInFrame && (( window.name != "PPTSld" ) || !parent.IsFullScrMode()) ) )
		return

	cltWidth=document.body.clientWidth
	cltHeight=document.body.clientHeight
	factor=(1.0*cltWidth)/g_origW
	if( cltHeight < g_origH*factor )
		factor=(1.0*cltHeight)/g_origH

	newSize = g_origSz * factor
	if( newSize < 1 ) newSize=1

	s=SlideObj.style
	s.fontSize=newSize+"px"
	s.posWidth=g_origW*factor
	s.posHeight=g_origH*factor
	s.posLeft=(cltWidth-s.posWidth)/2
	s.posTop=(cltHeight-s.posHeight)/2

	if( g_scaleHyperlinks )
		ScaleHyperlinks( factor )
}

function _KPH()
{ 
  if( IsNts() ) return;

  if( !parent.IsFramesMode() && event.keyCode == 27 && !parent.HideMenu() )
    parent.window.close( self );
  else if( event.keyCode == 32 )
  {
    if( window.name == "PPTSld" )
      parent.PPTSld.DocumentOnClick();
    else
      parent.GoToNextSld();
  }
}
var AE_NONE = 0, AE_DIM = 1, AE_HIDE = 2, AE_HIDEIMDTLY = 3, LONG_INTERVAL = 10, SHORT_INTERVAL = 5, g_curAnim = null, g_vml = 0;
function ParseAnimations(){
	nr = document.all.tags("DIV").length;
	while(nr > 0) {
		rObj = document.all.tags("DIV").item(--nr);
		if(rObj.style.cssText != null) {
			build = rObj.style.cssText.indexOf("mso-build");
			if(build >= 0)
				AddAnimation(rObj);
		}
	}
	if(g_autoTrans){
		totT=0, autoAnims=0;
		rAnims=g_animManager.m_anims;
		nBuilds=g_animManager.m_numBuilds;
		for(x=nBuilds;x>0;x--)
		if(-1 != rAnims[x].m_secs){
			totT+=rAnims[x].m_secs;
			autoAnims++;
		}
		time=g_transSecs-totT;
		if(time<0) time=0;
		time=time/(nBuilds-autoAnims+1);
		for(x=nBuilds;x>0;x--)
			if(-1 == rAnims[x].m_secs)
				rAnims[x].m_secs=time;
	}
}
function AddAnimation(rObj){
	a =new Animation();
	a.m_obj =rObj;
	a.m_oldc =rObj.color;
	GetVal=rObj.style.getAttribute;
	var t;
	if( t=GetVal("mso-build") ) a.m_build=t-0;
	if( t=GetVal("mso-build-after-action") ) a.m_aAct=t-0;
	if( t=GetVal("mso-build-after-color") ) a.m_oldc=t;
	if( t=GetVal("mso-build-auto-secs") ) a.m_secs=t-0;
	if( t=GetVal("mso-build-avi") ) a.m_video=t;
	if( t=GetVal("mso-build-dual-id") ) a.m_dId=t;
	if( t=GetVal("mso-build-order") ) a.m_order=t-0;
	if( t=GetVal("mso-build-sound-name") ) a.m_sound=t;

	g_animManager.AddAnimation(a);
}
function ShowVGXObj(rObj){
	vmlId=null,ImgTag=null;
	curObj=rObj;
	sObj =document.all.item("SlideObj");
	while(null == ImgTag && null != curObj && sObj != curObj){
		ImgTag =curObj.children.tags("IMG").item(0);
		curObj =(curObj.parentElement.tagName == "DIV") ? curObj.parentElement : null
	}
	if(null !=ImgTag)
		vmlId =ImgTag.getAttribute("v:shapes");
	if(null !=vmlId) {
		idx =vmlId.indexOf(",");
		if(idx > 0) vmlId =vmlId.substr(0, idx);
		vgxObj =document.all.item(vmlId);
		if((null != vgxObj) && (null != vgxObj.parentElement) && (vgxObj.parentElement.style.display != "none")){
			vgxObj.parentElement.style.visibility = "visible";
			ImgTag.style.visibility = "hidden";
		}
		else
			rObj.style.visibility = "visible";
	}
}
function AnimationManager(){
	t=this;
	t.m_anims=new Array();
	t.m_numBuilds=0;
	t.m_activeObj=null;
	t.m_curBuild=1;
	t.m_timer=-1;
	t.m_objToHide=null;
	t.m_objToDim=null;
	t.m_colorToDim=-1;
	t.m_isPlaying=0;
	t.m_autoTimer=-1;
	t.Peek=AM_Peek;
	t.Next=AM_Next;
	t.Previous=AM_Previous;
	t.AddAnimation=AM_AddAnimation;
	t.ShowShapes=AM_ShowShapes;
	t.Swap=AM_Swap;
}
function AM_ShowShapes(){
	for(x=this.m_numBuilds; x>0; x--){
		if(g_vml)
			ShowVGXObj(this.m_anims[x].m_obj);
		aObj =this.m_anims[x].m_obj;
		if(aObj)
			aObj.style.visibility = "visible";
	}
	this.m_numBuilds =0;
}
function AM_Swap(cur){
	rList =this.m_anims;
	t =rList[cur+1];
	rList[cur+1] =rList[cur];
	rList[cur] =t;
}
function AM_AddAnimation(a){
	this.m_anims[++this.m_numBuilds] = a;
	this.m_curBuild =this.m_numBuilds;
	cur =this.m_numBuilds;
	if(a.m_order > 0){
		while(cur-- > 1 && Math.abs(this.m_anims[cur+1].m_order) > Math.abs(this.m_anims[cur].m_order))
			this.Swap(cur);
	}
	else {
		while(cur-- > 1 && Math.abs(this.m_anims[cur+1].m_order) >= Math.abs(this.m_anims[cur].m_order))
			this.Swap(cur);
	}
}
function AM_Peek(){
	if(g_animManager.m_curBuild > 0 && 0 < g_animManager.m_numBuilds) {
		secs =g_animManager.m_anims[g_animManager.m_curBuild].m_secs;
		if(secs != -1)
			g_animManager.m_autoTimer = window.setTimeout("_DocAction()", secs);
	}
	else if(1 == g_autoTrans && IsWin("PPTSld") && !parent.IsFramesMode()){
		setTimeout("parent.GoToNextSld()", g_transSecs);
	}
}
function AM_Next(){
	if(0 == this.m_numBuilds || (g_curAnim != null)) return 0; 
	success=0;
	if(this.m_autoTimer != -1)
		window.clearTimeout(this.m_autoTimer);
	if(this.m_objToHide != null)
		this.m_objToHide.style.visibility = "hidden";
	if(this.m_objToDim != null) {
		nr = document.all.length;
		while(nr-- > 0) {
			rObj =document.all.item(nr);
			if(this.m_objToDim.contains(rObj))
				rObj.style.color = this.m_colorToDim;
		}
	}
	if(this.m_curBuild > 0) {
		this.m_activeObj =this.m_anims[this.m_curBuild--];
		this.m_activeObj.Start();
		success =1;
	}
	return success;
}
function AM_Previous(){
	if((null == g_curAnim) && (this.m_curBuild <= this.m_numBuilds)) {
		this.m_curBuild++;
		var animObj = this.m_anims[this.m_curBuild];
		if(this.m_curBuild >= 1)
			animObj.m_obj.style.visibility = "hidden";
	}
}
function InitBuildEffects(){
	g_animManager =new AnimationManager();
	ParseAnimations();
	isFullScreen =(window.name == "PPTSld") && !parent.IsFramesMode();
	if(!g_showAnimation || (isFullScreen && parent.IsSldVisited()))
		g_animManager.ShowShapes();
	else if(!g_hasTrans)
		g_animManager.Peek();
	if(isFullScreen && !g_isKiosk)
		parent.SetSldVisited();
}
function Animation(){
	t=this;
	t.m_obj=0;
	t.m_build=0;
	t.m_dId="";
	t.m_aAct=0;
	t.m_secs=-1;
	t.m_order=0;
	t.m_sound="";
	t.m_oldc=0;
	t.m_video="";
	t.m_animObj=0; 
	t.m_timer=-1;
	t.m_steps=0;
	t.m_finalL=0;
	t.m_finalT=0;
	t.m_finalW=0;
	t.m_finalH=0;
	t.Start=A_Start;
	t.End=A_End;
	t.Animate=A_Animate;
	t.SetupMove=A_SetupMove;
	t.DoMove=A_DoMove;
	t.DoSpiral=A_DoSpiral;
	t.DoSwivel=A_DoSwivel;
	t.DoInplace=A_DoInplace;
}
function TickHandler(){
	if(null != g_curAnim) g_curAnim.Animate();
}
function GetAnimClass(dir){
	if(dir > 99) return 7; 
	else if(dir > 28) return 5; 
	else if(dir == 27) return 4; 
	else if(dir == 28) return 3; 
	else if((dir >= 12) && (dir < 16))return 2; 
	else return 1; 
}
function GetSteps(dir){
	animClass =GetAnimClass(dir);
	if(animClass == 5 || animClass == 7) return 1; 
	res=12;
	if(animClass >= 2 && animClass <= 4) res = 50;
	if(SlideObj.style.backgroundImage != "") res /= 2;
	return res;
}
function A_Start(){
	g_curAnim = this;
	this.SetupMove();
	if(this.m_sound)
		PlaySound(this.m_sound, false);
	animClass =GetAnimClass(this.m_build);
	if(5 == animClass)
		this.DoInplace();
	else {
		this.m_animObj.style.visibility = "visible";
		time = 0;
		if(7 == animClass) { // Appear and flash
			switch(this.m_build) {
				case 100: time = 300; break;
				case 101:
				case 200: time = 500; break;
				case 102: time = 1000; break;
			}
			if(this.m_build < 200)
				this.m_aAct = AE_HIDEIMDTLY;
		}
		else
			time =(animClass % 2 == 0) ? LONG_INTERVAL : SHORT_INTERVAL;
		this.m_timer =window.setInterval("TickHandler()", time);
	}
}
function A_End(){
	window.clearInterval(this.m_timer);
	if(this.m_video != "")
		PlayMedia(this.m_video);
	rStyle = this.m_obj.style;
	if(this.m_dId == ""){
		rStyle.pixelLeft =this.m_finalL;
		rStyle.pixelTop =this.m_finalT;
		rStyle.pixelWidth	=this.m_finalW;
		rStyle.pixelHeight =this.m_finalH;
	}
	else {
		if(this.m_aAct != AE_HIDEIMDTLY)
			rStyle.visibility = "visible";
		this.m_animObj.style.visibility = "hidden";
	}
	switch(this.m_aAct){
		case AE_NONE: 
			if(g_vml)
				ShowVGXObj(this.m_obj);
			break;
		case AE_DIM:
			if(g_vml)
				ShowVGXObj(this.m_obj);
			g_animManager.m_objToDim	=this.m_obj;
			g_animManager.m_colorToDim	=this.m_oldc;
			break;
		case AE_HIDE:
			g_animManager.m_objToHide	=this.m_obj;
			break;
		case AE_HIDEIMDTLY:
			rStyle.visibility ="hidden";
			break;
	}
	if(this.m_dId != "")
		this.m_animObj.style.visibility ="hidden";
	if(!g_animManager.m_isPlaying){
		g_curAnim = null;
		this.m_obj = null;
		g_animManager.Peek();
	}
}
function A_Animate(){
	switch(GetAnimClass(this.m_build)) {
		case 1:
		case 2: this.DoMove();	break;
		case 3: this.DoSpiral();	break;
		case 4: this.DoSwivel();	break;
	}
	if(--this.m_steps == 0) 
		this.End();
}
function A_SetupMove(){
	dir =this.m_build;
	this.m_steps =GetSteps(dir);
	rObj =this.m_dId != "" ? document.all.item(this.m_dId) : this.m_obj;
	this.m_animObj =rObj;
	offsetL=0;
	offsetT=0;
	parentObj=rObj.parentElement;
	while(parentObj.tagName != "BODY" && parentObj.id != "SlideObj"){
		offsetL	+=parentObj.offsetLeft;
		offsetT	+=parentObj.offsetTop;
		parentObj =parentObj.parentElement; 
	}
	rStyle = rObj.style;
	this.m_finalL =sLeft =rStyle.pixelLeft;
	this.m_finalT =sTop =rStyle.pixelTop;
	this.m_finalW =sWidth =rStyle.pixelWidth;
	this.m_finalH =sHeight =rStyle.pixelHeight;
	clientW=SlideObj.style.pixelWidth-offsetL;
	clientH=SlideObj.style.pixelHeight-offsetT;
 	if(dir < 100) {
		switch(dir) {
			case 0: case 12: sLeft=-(sWidth+offsetL); break;
			case 1: case 13: sTop=-(sHeight+offsetT);	break;
			case 2: case 14: sLeft=clientW; break;
			case 3: case 15: sTop=clientH; break;
			case 4: 
				sLeft=-(sWidth+offsetL); 
				sTop=-(sHeight+offsetT); 
				break;
			case 5: 
				sLeft=clientW; 
				sTop=-(sHeight+offsetT); 
				break;
			case 6: 
				sLeft=-(sWidth+offsetL); 
				sTop=clientH; 
				break;
			case 7: 
				sLeft=clientW; 
				sTop=clientH; 
				break;
			case 8: sLeft-=sWidth; break;
			case 9: sTop+=sHeight; break;
			case 10: sLeft+=sWidth; break;
			case 11: sTop-=sHeight; break;
			case 16:
				sLeft+=sWidth/2;
				sTop+=sHeight/2;
				sWidth=0;
				sHeight=0;
				break;
			case 17:
				sLeft+=sWidth/6;
				sTop+=sHeight/6;
				sWidth=sWidth*2/3;
				sHeight=sHeight*2/3;
				break;
			case 18:
				sLeft-=(3*sWidth)/2;
				sTop-=(3*sHeight)/2;
				sWidth=sWidth*4;
				sHeight=sHeight*4;
				break;
			case 19:
				sLeft-=sWidth/6;
				sTop-=sHeight/6;
				sWidth=sWidth*4/3;
				sHeight=sHeight*4/3;
				break;
			case 20:
				sLeft=clientW/2;
				sTop=clientH/2;
				sWidth=0;
				sHeight=0;
				break;
			case 21:
				sLeft= 0; 
				sTop=clientH; 
				sWidth=clientW; 
				sHeight=clientH;
				break;
			case 22:
				sLeft+=sWidth/2;
				sWidth=0;
				break;
			case 23: sWidth=0; break;
			case 24: sHeight=0; break;
			case 25:
				sLeft+=sWidth;
				sWidth=0;
				break;
			case 26:
				sTop+=sHeight;
				sHeight=0;
				break;
			case 27:
				sLeft+=sWidth/2;
				sWidth=0;
				break;
			case 28:
				sLeft=0;
				sTop=clientH;
				sWidth=0;
				sHeight=0;
				break;
		}
	}
	if(0 == sWidth) 
		sWidth++;
	rStyle.pixelLeft=sLeft;
	rStyle.pixelTop=sTop;
	rStyle.pixelWidth=sWidth;
	rStyle.pixelHeight=sHeight;
}
function A_DoInplace(){
	if(this.m_animObj.filters.revealtrans){
		this.m_animObj.filters.revealtrans.Apply();
		this.m_animObj.style.visibility ="visible";
		this.m_animObj.filters.revealtrans.Play();
	}
}
function A_DoMove(){
	rStyle = this.m_animObj.style;
	rStyle.pixelLeft +=(this.m_finalL - rStyle.pixelLeft)/this.m_steps;
	rStyle.pixelTop +=(this.m_finalT - rStyle.pixelTop)/this.m_steps;
	rStyle.pixelWidth +=(this.m_finalW - rStyle.pixelWidth)/this.m_steps;
	rStyle.pixelHeight +=(this.m_finalH - rStyle.pixelHeight)/this.m_steps;
} 
function A_DoSpiral(){
	ratio =this.m_steps / GetSteps(this.m_build);
	angle =2*ratio*3.14;
	cosa =Math.cos(angle);
	sina =Math.sin(angle);
	vx =(this.m_finalL + this.m_finalW / 2)*ratio;
	vy =(this.m_finalT + this.m_finalH / 2 - SlideObj.style.pixelHeight) * ratio;
	rStyle =this.m_animObj.style;
	rStyle.pixelLeft =this.m_finalL - vx * cosa - vy * sina;
	rStyle.pixelTop =this.m_finalT + vx * sina - vy * cosa;
	rStyle.pixelWidth =this.m_finalW * (1 - ratio);
	rStyle.pixelHeight =this.m_finalH * (1 - ratio);
}
function A_DoSwivel(){
	rStyle =this.m_animObj.style;
	angle =this.m_steps / GetSteps(this.m_build) * 5 * 3.14 / 2;
	difX =Math.abs(this.m_finalW * Math.cos(angle));
	rStyle.pixelLeft =this.m_finalL + (this.m_finalW - difX) / 2;
	if(0 == difX) difX++;
	rStyle.pixelWidth =difX;
}
function DocumentOnClick()
{
	if( IsNts() || parent.HideMenu() ) return
	_DocAction()
}
function _DocAction()
{
	if( g_animManager && g_animManager.m_isPlaying && g_curAnim )
		StopMedia( g_curAnim.m_video );

	if( ( g_showAnimation && !g_curAnim && 
		g_animManager && g_animManager.Next() ) )
		return;

	if( ( g_allowAdvOnClick && (window.name=="PPTSld") && !parent.IsFramesMode() && 
		!g_curAnim ) || (!g_curAnim && event && event.keyCode==32) )
		parent.GoToNextSld();
}


var g_supportsPPTHTML = SupportsPPTHTML(), g_scaleInFrame = true, gId="", g_bgSound="",
    g_scaleHyperlinks = false, g_allowAdvOnClick = true, g_showInBrowser = false;
var g_showAnimation = g_supportsPPTHTML && SupportsPPTAnimation() && ( (window.name=="PPTSld" && !parent.IsFramesMode()) || g_showInBrowser );var g_hasTrans = false, g_autoTrans = false, g_transSecs = 0;
var g_isKiosk = 0;var g_animManager = null;

var ENDSHOW_MESG="End of slide show, click to exit.", SCREEN_MODE="Frames", gIsEndShow=0, NUM_VIS_SLDS=172, SCRIPT_HREF="oscar-for-squad-sched-coords_script.js", FULLSCR_HREF="oscar-for-squad-sched-coords_fullscreen.htm";
var gCurSld = gPrevSld = 1, g_offset = 0, gNtsOpen = gHasNts = gOtlTxtExp = gNarrationPaused = false, gOtlOpen = true
window.gPPTHTML=SupportsPPTHTML()

function UpdNtsPane(){ PPTNts.location.replace( MHTMLPrefix+GetHrefObj( gCurSld ).mNtsHref ) }
function UpdNavPane( sldIndex ){ if(gNavLoaded) PPTNav.UpdNav() }
function UpdOtNavPane(){ if(gOtlNavLoaded) PPTOtlNav.UpdOtlNav() }
function UpdOtlPane(){ if(gOtlLoaded) PPTOtl.UpdOtl() }
function SetHasNts( fVal )
{
	if( gHasNts != fVal ) {
		gHasNts=fVal
		UpdNavPane()
	}
}
function ToggleOtlText()
{
	gOtlTxtExp=!gOtlTxtExp
	UpdOtlPane()
}
function ToggleOtlPane()
{
	frmset=document.all("PPTHorizAdjust")
	frm=document.all("PPTOtl")

	if( gOtlOpen )
		frmset.cols="*,100%"
	else
		frmset.cols="20%,80%"

	gOtlOpen=!gOtlOpen
	frm.noResize=!frm.noResize
	UpdOtNavPane()
}
function ToggleNtsPane()
{
	frmset=document.all("PPTVertAdjust")
	frm=document.all("PPTNts")

	if( gNtsOpen )
		frmset.rows="100%,*"
	else
		frmset.rows="80%,20%"

	gNtsOpen=!gNtsOpen
	UpdNtsPane()
}
function FullScreen(){ window.open( MHTMLPrefix+FULLSCR_HREF,null,"fullscreen=yes" ) }
function ToggleVNarration()
{
	rObj=PPTSld.document.all("NSPlay")
	if( rObj ) {
		if( gNarrationPaused )
			rObj.Play()
		else
			rObj.Pause()

		gNarrationPaused=!gNarrationPaused
	}
}
function GetCurSldNum()
{   
	obj=GetHrefObj(gCurSld)
	if( obj.mOrigVis == 1 )
		return obj.mSldIdx
	else   
		return gCurSld
}
function GetNumSlds()
{   
	if( GetHrefObj(gCurSld).mOrigVis == 1 )
		return NUM_VIS_SLDS
	else
		return gDocTable.length
}
function GetSldNum( href )
{
	for(ii=0; ii<gDocTable.length; ii++) {
		if ( gDocTable[ii].mSldHref == href )
			return ii+1
	}
	return 1
}
function GetHrefObj( sldIdx ){ return gDocTable[sldIdx-1] }
function IsFramesMode(){ return ( SCREEN_MODE == "Frames" ) }
function IsFullScrMode(){ return ( SCREEN_MODE == "FullScreen" ) }
function GoToNextSld()
{   
	ii=gCurSld + 1
	if( GetHrefObj( ii-1 ).mOrigVis == 0 ) {
		if( ii<=gDocTable.length ) {
			obj=GetHrefObj(ii)
			obj.mVis=1
			GoToSld(obj.mSldHref)
			return
		}		
	}
	else {
		obj=GetHrefObj( ii )
		while ( obj && ( obj.mOrigVis == 0 ) )
			obj=GetHrefObj(ii++)
		if( obj && obj.mOrigVis ) {
			GoToSld(obj.mSldHref)	
			return
		}	
	}
	if( !IsFramesMode() ) EndShow()
}
function GoToPrevSld()
{
	ii=gCurSld-1
	if( ii > 0 ) {      
		obj=GetHrefObj(ii)
		while ( ( obj.mVis == 0 ) && ( ii>0 ) )
			obj=GetHrefObj(ii--)
		GoToSld(obj.mSldHref)
	}
}
function GoToFirst(){ GoToSld( GetHrefObj(1).mSldHref ) }
function GoToLast()
{
	ii=gDocTable.length
	if( ii != gCurSld )
		GoToSld( GetHrefObj(ii).mSldHref )
}
function GoToSld( href )
{
	if( PPTSld.event ) PPTSld.event.cancelBubble=true
	GetHrefObj( GetSldNum(href) ).mVis=1
	PPTSld.location.href=MHTMLPrefix+href
}
function SldUpdated( id )
{
	if( id == GetHrefObj(gCurSld).mSldHref ) return
	gPrevSld=gCurSld
	gCurSld=GetSldNum(id)
	if( IsFramesMode() ) {
		UpdNavPane(); UpdOtlPane(); UpdNtsPane()
	}
}

function PrevSldViewed(){ GoToSld( GetHrefObj(gPrevSld).mSldHref ) }
function HasPrevSld() { return ( gIsEndShow || ( gCurSld != 1 && GetHrefObj( gCurSld-1 ).mVis == 1 )||( GetCurSldNum() > 1 ) ) }
function HasNextSld() { return (GetCurSldNum() != GetNumSlds()) }
function EndShow()
{
	if( PPTSld.event ) PPTSld.event.cancelBubble=true

	doc=PPTSld.document
	doc.open()
	doc.writeln('<html><head><script defer>function CloseWindow(){ if( parent.HideMenu() ) return; if( !parent.IsFramesMode() && event && (event.keyCode==27 || event.keyCode==32 || event.type=="click" ) ) parent.window.close( self ); } function Unload() { parent.gIsEndShow=0; } function SetupEndShow() { parent.gIsEndShow=1; document.body.scroll="no"; document.onkeypress=CloseWindow; document.onclick=CloseWindow; document.oncontextmenu=parent._CM; }</script></head><body bgcolor=black onload=SetupEndShow() onunload=Unload()><center><p><font face=Tahoma color=white size=2><br><b>' + ENDSHOW_MESG + '</b></font></p></center></body></html>')
	doc.close()
}
function SetSldVisited(){ gDocTable[gCurSld-1].mVisited=true }
function IsSldVisited(){ return gDocTable[gCurSld-1].mVisited }
function hrefList( sldHref, visible, sldIdx )
{
	this.mSldHref= this.mNtsHref = sldHref
	this.mSldIdx = sldIdx
	this.mOrigVis= this.mVis = visible
	this.mVisited= false
}
var gDocTable = new Array(
   new hrefList("oscar-for-squad-sched-coords_slide0001.htm", 1, 1),
   new hrefList("oscar-for-squad-sched-coords_slide0002.htm", 1, 2),
   new hrefList("oscar-for-squad-sched-coords_slide0106.htm", 1, 3),
   new hrefList("oscar-for-squad-sched-coords_slide0010.htm", 1, 4),
   new hrefList("oscar-for-squad-sched-coords_slide0011.htm", 1, 5),
   new hrefList("oscar-for-squad-sched-coords_slide0006.htm", 1, 6),
   new hrefList("oscar-for-squad-sched-coords_slide0012.htm", 1, 7),
   new hrefList("oscar-for-squad-sched-coords_slide0112.htm", 1, 8),
   new hrefList("oscar-for-squad-sched-coords_slide0014.htm", 1, 9),
   new hrefList("oscar-for-squad-sched-coords_slide0017.htm", 1, 10),
   new hrefList("oscar-for-squad-sched-coords_slide0013.htm", 1, 11),
   new hrefList("oscar-for-squad-sched-coords_slide0019.htm", 1, 12),
   new hrefList("oscar-for-squad-sched-coords_slide0021.htm", 1, 13),
   new hrefList("oscar-for-squad-sched-coords_slide0022.htm", 1, 14),
   new hrefList("oscar-for-squad-sched-coords_slide0023.htm", 1, 15),
   new hrefList("oscar-for-squad-sched-coords_slide0025.htm", 1, 16),
   new hrefList("oscar-for-squad-sched-coords_slide0027.htm", 1, 17),
   new hrefList("oscar-for-squad-sched-coords_slide0028.htm", 1, 18),
   new hrefList("oscar-for-squad-sched-coords_slide0026.htm", 1, 19),
   new hrefList("oscar-for-squad-sched-coords_slide0034.htm", 1, 20),
   new hrefList("oscar-for-squad-sched-coords_slide0032.htm", 1, 21),
   new hrefList("oscar-for-squad-sched-coords_slide0030.htm", 1, 22),
   new hrefList("oscar-for-squad-sched-coords_slide0029.htm", 1, 23),
   new hrefList("oscar-for-squad-sched-coords_slide0035.htm", 1, 24),
   new hrefList("oscar-for-squad-sched-coords_slide0037.htm", 1, 25),
   new hrefList("oscar-for-squad-sched-coords_slide0038.htm", 1, 26),
   new hrefList("oscar-for-squad-sched-coords_slide0039.htm", 1, 27),
   new hrefList("oscar-for-squad-sched-coords_slide0040.htm", 1, 28),
   new hrefList("oscar-for-squad-sched-coords_slide0041.htm", 1, 29),
   new hrefList("oscar-for-squad-sched-coords_slide0042.htm", 1, 30),
   new hrefList("oscar-for-squad-sched-coords_slide0043.htm", 1, 31),
   new hrefList("oscar-for-squad-sched-coords_slide0044.htm", 1, 32),
   new hrefList("oscar-for-squad-sched-coords_slide0045.htm", 1, 33),
   new hrefList("oscar-for-squad-sched-coords_slide0046.htm", 1, 34),
   new hrefList("oscar-for-squad-sched-coords_slide0047.htm", 1, 35),
   new hrefList("oscar-for-squad-sched-coords_slide0048.htm", 1, 36),
   new hrefList("oscar-for-squad-sched-coords_slide0049.htm", 1, 37),
   new hrefList("oscar-for-squad-sched-coords_slide0050.htm", 1, 38),
   new hrefList("oscar-for-squad-sched-coords_slide0051.htm", 1, 39),
   new hrefList("oscar-for-squad-sched-coords_slide0052.htm", 1, 40),
   new hrefList("oscar-for-squad-sched-coords_slide0053.htm", 1, 41),
   new hrefList("oscar-for-squad-sched-coords_slide0054.htm", 1, 42),
   new hrefList("oscar-for-squad-sched-coords_slide0055.htm", 1, 43),
   new hrefList("oscar-for-squad-sched-coords_slide0056.htm", 1, 44),
   new hrefList("oscar-for-squad-sched-coords_slide0057.htm", 1, 45),
   new hrefList("oscar-for-squad-sched-coords_slide0058.htm", 1, 46),
   new hrefList("oscar-for-squad-sched-coords_slide0059.htm", 1, 47),
   new hrefList("oscar-for-squad-sched-coords_slide0060.htm", 1, 48),
   new hrefList("oscar-for-squad-sched-coords_slide0061.htm", 1, 49),
   new hrefList("oscar-for-squad-sched-coords_slide0062.htm", 1, 50),
   new hrefList("oscar-for-squad-sched-coords_slide0105.htm", 1, 51),
   new hrefList("oscar-for-squad-sched-coords_slide0113.htm", 1, 52),
   new hrefList("oscar-for-squad-sched-coords_slide0063.htm", 1, 53),
   new hrefList("oscar-for-squad-sched-coords_slide0064.htm", 1, 54),
   new hrefList("oscar-for-squad-sched-coords_slide0066.htm", 1, 55),
   new hrefList("oscar-for-squad-sched-coords_slide0065.htm", 1, 56),
   new hrefList("oscar-for-squad-sched-coords_slide0190.htm", 1, 57),
   new hrefList("oscar-for-squad-sched-coords_slide0067.htm", 1, 58),
   new hrefList("oscar-for-squad-sched-coords_slide0068.htm", 1, 59),
   new hrefList("oscar-for-squad-sched-coords_slide0069.htm", 1, 60),
   new hrefList("oscar-for-squad-sched-coords_slide0070.htm", 1, 61),
   new hrefList("oscar-for-squad-sched-coords_slide0071.htm", 1, 62),
   new hrefList("oscar-for-squad-sched-coords_slide0143.htm", 1, 63),
   new hrefList("oscar-for-squad-sched-coords_slide0072.htm", 1, 64),
   new hrefList("oscar-for-squad-sched-coords_slide0073.htm", 1, 65),
   new hrefList("oscar-for-squad-sched-coords_slide0074.htm", 1, 66),
   new hrefList("oscar-for-squad-sched-coords_slide0180.htm", 1, 67),
   new hrefList("oscar-for-squad-sched-coords_slide0181.htm", 1, 68),
   new hrefList("oscar-for-squad-sched-coords_slide0182.htm", 1, 69),
   new hrefList("oscar-for-squad-sched-coords_slide0075.htm", 1, 70),
   new hrefList("oscar-for-squad-sched-coords_slide0183.htm", 1, 71),
   new hrefList("oscar-for-squad-sched-coords_slide0076.htm", 1, 72),
   new hrefList("oscar-for-squad-sched-coords_slide0184.htm", 1, 73),
   new hrefList("oscar-for-squad-sched-coords_slide0078.htm", 1, 74),
   new hrefList("oscar-for-squad-sched-coords_slide0185.htm", 1, 75),
   new hrefList("oscar-for-squad-sched-coords_slide0079.htm", 1, 76),
   new hrefList("oscar-for-squad-sched-coords_slide0082.htm", 1, 77),
   new hrefList("oscar-for-squad-sched-coords_slide0186.htm", 1, 78),
   new hrefList("oscar-for-squad-sched-coords_slide0187.htm", 1, 79),
   new hrefList("oscar-for-squad-sched-coords_slide0188.htm", 1, 80),
   new hrefList("oscar-for-squad-sched-coords_slide0084.htm", 1, 81),
   new hrefList("oscar-for-squad-sched-coords_slide0083.htm", 1, 82),
   new hrefList("oscar-for-squad-sched-coords_slide0085.htm", 1, 83),
   new hrefList("oscar-for-squad-sched-coords_slide0086.htm", 1, 84),
   new hrefList("oscar-for-squad-sched-coords_slide0087.htm", 1, 85),
   new hrefList("oscar-for-squad-sched-coords_slide0144.htm", 1, 86),
   new hrefList("oscar-for-squad-sched-coords_slide0145.htm", 1, 87),
   new hrefList("oscar-for-squad-sched-coords_slide0146.htm", 1, 88),
   new hrefList("oscar-for-squad-sched-coords_slide0147.htm", 1, 89),
   new hrefList("oscar-for-squad-sched-coords_slide0148.htm", 1, 90),
   new hrefList("oscar-for-squad-sched-coords_slide0149.htm", 1, 91),
   new hrefList("oscar-for-squad-sched-coords_slide0088.htm", 1, 92),
   new hrefList("oscar-for-squad-sched-coords_slide0089.htm", 1, 93),
   new hrefList("oscar-for-squad-sched-coords_slide0090.htm", 1, 94),
   new hrefList("oscar-for-squad-sched-coords_slide0189.htm", 1, 95),
   new hrefList("oscar-for-squad-sched-coords_slide0091.htm", 1, 96),
   new hrefList("oscar-for-squad-sched-coords_slide0092.htm", 1, 97),
   new hrefList("oscar-for-squad-sched-coords_slide0093.htm", 1, 98),
   new hrefList("oscar-for-squad-sched-coords_slide0151.htm", 1, 99),
   new hrefList("oscar-for-squad-sched-coords_slide0150.htm", 1, 100),
   new hrefList("oscar-for-squad-sched-coords_slide0094.htm", 1, 101),
   new hrefList("oscar-for-squad-sched-coords_slide0152.htm", 1, 102),
   new hrefList("oscar-for-squad-sched-coords_slide0095.htm", 1, 103),
   new hrefList("oscar-for-squad-sched-coords_slide0115.htm", 1, 104),
   new hrefList("oscar-for-squad-sched-coords_slide0116.htm", 1, 105),
   new hrefList("oscar-for-squad-sched-coords_slide0118.htm", 1, 106),
   new hrefList("oscar-for-squad-sched-coords_slide0153.htm", 1, 107),
   new hrefList("oscar-for-squad-sched-coords_slide0156.htm", 1, 108),
   new hrefList("oscar-for-squad-sched-coords_slide0154.htm", 1, 109),
   new hrefList("oscar-for-squad-sched-coords_slide0155.htm", 1, 110),
   new hrefList("oscar-for-squad-sched-coords_slide0120.htm", 1, 111),
   new hrefList("oscar-for-squad-sched-coords_slide0157.htm", 1, 112),
   new hrefList("oscar-for-squad-sched-coords_slide0158.htm", 1, 113),
   new hrefList("oscar-for-squad-sched-coords_slide0159.htm", 1, 114),
   new hrefList("oscar-for-squad-sched-coords_slide0121.htm", 1, 115),
   new hrefList("oscar-for-squad-sched-coords_slide0122.htm", 1, 116),
   new hrefList("oscar-for-squad-sched-coords_slide0123.htm", 1, 117),
   new hrefList("oscar-for-squad-sched-coords_slide0138.htm", 1, 118),
   new hrefList("oscar-for-squad-sched-coords_slide0124.htm", 1, 119),
   new hrefList("oscar-for-squad-sched-coords_slide0160.htm", 1, 120),
   new hrefList("oscar-for-squad-sched-coords_slide0125.htm", 1, 121),
   new hrefList("oscar-for-squad-sched-coords_slide0161.htm", 1, 122),
   new hrefList("oscar-for-squad-sched-coords_slide0162.htm", 1, 123),
   new hrefList("oscar-for-squad-sched-coords_slide0126.htm", 1, 124),
   new hrefList("oscar-for-squad-sched-coords_slide0128.htm", 1, 125),
   new hrefList("oscar-for-squad-sched-coords_slide0163.htm", 1, 126),
   new hrefList("oscar-for-squad-sched-coords_slide0164.htm", 1, 127),
   new hrefList("oscar-for-squad-sched-coords_slide0129.htm", 1, 128),
   new hrefList("oscar-for-squad-sched-coords_slide0130.htm", 1, 129),
   new hrefList("oscar-for-squad-sched-coords_slide0131.htm", 1, 130),
   new hrefList("oscar-for-squad-sched-coords_slide0132.htm", 1, 131),
   new hrefList("oscar-for-squad-sched-coords_slide0133.htm", 1, 132),
   new hrefList("oscar-for-squad-sched-coords_slide0134.htm", 1, 133),
   new hrefList("oscar-for-squad-sched-coords_slide0135.htm", 1, 134),
   new hrefList("oscar-for-squad-sched-coords_slide0140.htm", 1, 135),
   new hrefList("oscar-for-squad-sched-coords_slide0165.htm", 1, 136),
   new hrefList("oscar-for-squad-sched-coords_slide0166.htm", 1, 137),
   new hrefList("oscar-for-squad-sched-coords_slide0167.htm", 1, 138),
   new hrefList("oscar-for-squad-sched-coords_slide0139.htm", 1, 139),
   new hrefList("oscar-for-squad-sched-coords_slide0168.htm", 1, 140),
   new hrefList("oscar-for-squad-sched-coords_slide0169.htm", 1, 141),
   new hrefList("oscar-for-squad-sched-coords_slide0137.htm", 1, 142),
   new hrefList("oscar-for-squad-sched-coords_slide0141.htm", 1, 143),
   new hrefList("oscar-for-squad-sched-coords_slide0142.htm", 1, 144),
   new hrefList("oscar-for-squad-sched-coords_slide0114.htm", 1, 145),
   new hrefList("oscar-for-squad-sched-coords_slide0096.htm", 1, 146),
   new hrefList("oscar-for-squad-sched-coords_slide0170.htm", 1, 147),
   new hrefList("oscar-for-squad-sched-coords_slide0097.htm", 1, 148),
   new hrefList("oscar-for-squad-sched-coords_slide0171.htm", 1, 149),
   new hrefList("oscar-for-squad-sched-coords_slide0172.htm", 1, 150),
   new hrefList("oscar-for-squad-sched-coords_slide0173.htm", 1, 151),
   new hrefList("oscar-for-squad-sched-coords_slide0098.htm", 1, 152),
   new hrefList("oscar-for-squad-sched-coords_slide0099.htm", 1, 153),
   new hrefList("oscar-for-squad-sched-coords_slide0174.htm", 1, 154),
   new hrefList("oscar-for-squad-sched-coords_slide0100.htm", 1, 155),
   new hrefList("oscar-for-squad-sched-coords_slide0175.htm", 1, 156),
   new hrefList("oscar-for-squad-sched-coords_slide0101.htm", 1, 157),
   new hrefList("oscar-for-squad-sched-coords_slide0176.htm", 1, 158),
   new hrefList("oscar-for-squad-sched-coords_slide0102.htm", 1, 159),
   new hrefList("oscar-for-squad-sched-coords_slide0177.htm", 1, 160),
   new hrefList("oscar-for-squad-sched-coords_slide0178.htm", 1, 161),
   new hrefList("oscar-for-squad-sched-coords_slide0103.htm", 1, 162),
   new hrefList("oscar-for-squad-sched-coords_slide0179.htm", 1, 163),
   new hrefList("oscar-for-squad-sched-coords_slide0104.htm", 1, 164),
   new hrefList("oscar-for-squad-sched-coords_slide0119.htm", 1, 165),
   new hrefList("oscar-for-squad-sched-coords_slide0107.htm", 1, 166),
   new hrefList("oscar-for-squad-sched-coords_slide0108.htm", 1, 167),
   new hrefList("oscar-for-squad-sched-coords_slide0008.htm", 1, 168),
   new hrefList("oscar-for-squad-sched-coords_slide0109.htm", 1, 169),
   new hrefList("oscar-for-squad-sched-coords_slide0111.htm", 1, 170),
   new hrefList("oscar-for-squad-sched-coords_slide0110.htm", 1, 171),
   new hrefList("oscar-for-squad-sched-coords_slide0009.htm", 1, 172)
);

function ImgBtn( oId,bId,w,action )
{
	var t=this
	t.Perform    = _IBP
	t.SetActive  = _IBSetA
	t.SetInactive= _IBSetI
	t.SetPressed = _IBSetP
	t.SetDisabled= _IBSetD
	t.Enabled    = _IBSetE
	t.ChangeIcon = null
	t.UserAction = action
	t.ChgState   = _IBUI
	t.mObjId   = oId
	t.mBorderId= bId
	t.mWidth   = w
	t.mIsOn    = t.mCurState = 0
}
function _IBSetA()
{
	if( this.mIsOn ) {
		obj=this.ChgState( gHiliteClr,gShadowClr,2 )
		obj.style.posTop=0
	}
}
function _IBSetI()
{
	if( this.mIsOn ) {
		obj=this.ChgState( gFaceClr,gFaceClr,1 )
		obj.style.posTop=0 
	}
}
function _IBSetP()
{
	if( this.mIsOn ) {
		obj=this.ChgState( gShadowClr,gHiliteClr,2 )
		obj.style.posLeft+=1; obj.style.posTop+=1
	}
}
function _IBSetD()
{  
	obj=this.ChgState( gFaceClr,gFaceClr,0 )
	obj.style.posTop=0 
}
function _IBSetE( state )
{
	var t=this
	GetObj( t.mBorderId ).style.visibility="visible"
	if( state != t.mIsOn ) {
		t.mIsOn=state
		if( state )
			t.SetInactive()
		else
			t.SetDisabled()
	}
}
function _IBP()
{
	var t=this
	if( t.mIsOn ) {
		if( t.UserAction != null )
			t.UserAction()
		if( t.ChangeIcon ) {
			obj=GetObj(t.mObjId)
			if( t.ChangeIcon() )
				obj.style.posLeft=obj.style.posLeft+(t.mCurState-4)*t.mWidth
			else
				obj.style.posLeft=obj.style.posLeft+(t.mCurState-0)*t.mWidth
		}
		t.SetActive()
	}  
}
function _IBUI( clr1,clr2,nextState )
{
	var t=this
	SetBorder( GetObj( t.mBorderId ),clr1,clr2 )
	obj=GetObj( t.mObjId )
	obj.style.posLeft=obj.style.posLeft+(t.mCurState-nextState)*t.mWidth-obj.style.posTop
	t.mCurState=nextState
	return obj
}
function TxtBtn( oId,oeId,action,chkState )
{
	var t=this
	t.Perform    = _TBP
	t.SetActive  = _TBSetA
	t.SetInactive= _TBSetI
	t.SetPressed = _TBSetP
	t.SetDisabled= _TBSetD
	t.SetEnabled = _TBSetE
	t.GetState   = chkState
	t.UserAction = action
	t.ChgState   = _TBUI
	t.mObjId      = oId
	t.m_elementsId= oeId
	t.mIsOn       = 1
}
function _TBSetA()
{
	var t=this
	if( t.mIsOn && !t.GetState() )
		t.ChgState( gHiliteClr,gShadowClr,0,0 )
}
function _TBSetI()
{
	var t=this
	if( t.mIsOn && !t.GetState() )
		t.ChgState( gFaceClr,gFaceClr,0,0 )
}
function _TBSetP()
{
	if( this.mIsOn )
		this.ChgState( gShadowClr,gHiliteClr,1,1 )
}
function _TBSetD()
{   
	this.ChgState( gFaceClr,gFaceClr,0,0 )
	this.mIsOn = 0
}
function _TBSetE()
{
	var t=this
	if( !t.GetState() )
		t.ChgState( gFaceClr,gFaceClr,0,0 )
	else
		t.ChgState( gShadowClr,gHiliteClr,1,1 )
	t.mIsOn = 1
}
function _TBP()
{
	var t=this
	if( t.mIsOn ) { 
		if( t.UserAction != null )
			t.UserAction()
		if( t.GetState() )
			t.SetPressed()
		else
			t.SetActive()
	}  
}
function _TBUI( clr1,clr2,lOffset,tOffset )
{
	SetBorder( GetObj( this.mObjId ),clr1,clr2 )
	Offset( GetObj( this.m_elementsId ),lOffset,tOffset )
}
function GetObj( objId ){ return document.all.item( objId ) }
function Offset( obj, top, left ){ obj.style.top=top; obj.style.left=left }
function SetBorder( obj, upperLeft, lowerRight )
{
	s=obj.style;
	s.borderStyle      = "solid"
	s.borderWidth      = 1 
	s.borderLeftColor  = s.borderTopColor = upperLeft
	s.borderBottomColor= s.borderRightColor = lowerRight
}
function GetBtnObj(){ return gBtnArr[window.event.srcElement.id] }
function BtnOnOver(){ b=GetBtnObj(); if( b != null ) b.SetActive() }
function BtnOnDown(){ b=GetBtnObj(); if( b != null ) b.SetPressed() }
function BtnOnOut(){ b=GetBtnObj(); if( b != null ) b.SetInactive() }
function BtnOnUp()
{
	b=GetBtnObj()
	if( b != null )
		b.Perform()
	else
		Upd()
}
function GetNtsState(){ return parent.gNtsOpen }
function GetOtlState(){ return parent.gOtlOpen }
function GetOtlTxtState(){ return parent.gOtlTxtExp }
function NtsBtnSetFlag( fVal )
{
	s=document.all.item( this.m_flagId ).style
	s.display="none"
	if( fVal )
		s.display=""
	else
		s.display="none"
}

var gHiliteClr="THREEDHIGHLIGHT",gShadowClr="THREEDSHADOW",gFaceClr="THREEDFACE"
var gBtnArr = new Array()
gBtnArr["nb_otl"] = new TxtBtn( "nb_otl","nb_otlElem",parent.ToggleOtlPane,GetOtlState )
gBtnArr["nb_nts"] = new TxtBtn( "nb_nts","nb_ntsElem",parent.ToggleNtsPane,GetNtsState )
gBtnArr["nb_prev"]= new ImgBtn( "nb_prev","nb_prevBorder",30,parent.GoToPrevSld )
gBtnArr["nb_next"]= new ImgBtn( "nb_next","nb_nextBorder",30,parent.GoToNextSld )
gBtnArr["nb_sldshw"]= new ImgBtn( "nb_sldshw","nb_sldshwBorder",18,parent.FullScreen )
gBtnArr["nb_voice"]  = new ImgBtn( "nb_voice","nb_voiceBorder",18,parent.ToggleVNarration )
gBtnArr["nb_otlTxt"]= new ImgBtn( "nb_otlTxt","nb_otlTxtBorder",23,parent.ToggleOtlText )
gBtnArr["nb_nts"].m_flagId= "notes_flag"
gBtnArr["nb_nts"].SetFlag = NtsBtnSetFlag
gBtnArr["nb_otlTxt"].ChangeIcon= GetOtlTxtState
var sNext="Next",sPrev="Previous",sEnd="End Show",sFont="Arial"
function ShowMenu()
{
	BuildMenu();
	var doc=PPTSld.document.body,x=PPTSld.event.clientX+doc.scrollLeft,y=PPTSld.event.clientY+doc.scrollTop

	m = PPTSld.document.all.item("ctxtmenu")
	m.style.pixelLeft=x
	if( (x+m.scrollWidth > doc.clientWidth)&&(x-m.scrollWidth > 0) )
		m.style.pixelLeft=x-m.scrollWidth

	m.style.pixelTop=y
	if( (y+m.scrollHeight > doc.clientHeight)&&(y-m.scrollHeight > 0) )
		m.style.pixelTop=y-m.scrollHeight

	m.style.display=""
}
function _CM()
{
	if( !parent.IsFullScrMode() ) return;
	if(!PPTSld.event.ctrlKey) {
		ShowMenu()
		return false
	} else
		HideMenu()
}
function BuildMenu()
{
	if( PPTSld.document.all.item("ctxtmenu") ) return

	var mObj=CreateItem( PPTSld.document.body )
	mObj.id="ctxtmenu"
	var s=mObj.style
	s.position="absolute"
	s.cursor="default"
	s.width="100px"
	SetCMBorder(mObj,"menu","black")

	var iObj=CreateItem( mObj )
	SetCMBorder( iObj, "threedhighlight","threedshadow" )
	iObj.style.padding=2
	CreateMenuItem( iObj,sNext,M_GoNextSld,M_True )
	CreateMenuItem( iObj,sPrev,M_GoPrevSld,M_HasPrevSld )
	var sObj=CreateItem( iObj )
	SetCMBorder(sObj,"menu","menu")
	var s=sObj.style
	s.borderTopColor="threedshadow"
	s.borderBottomColor="threedhighlight"
	s.height=1
	s.fontSize="0px"
	CreateMenuItem( iObj,sEnd,M_End,M_True )
}
function Highlight() { ChangeClr("activecaption","threedhighlight") }
function Deselect() { ChangeClr("threedface","menutext") }
function Perform()
{
	e=PPTSld.event.srcElement
	if( e.type=="menuitem" && e.IsActive() )
		e.Action()
	else
		PPTSld.event.cancelBubble=true
}
function ChangeClr( bg,clr )
{
	e=PPTSld.event.srcElement
	if( e.type=="menuitem" && e.IsActive() ) {
		e.style.backgroundColor=bg
		e.style.color=clr
	}
}

function M_HasPrevSld() { return( parent.HasPrevSld() ) }
function M_GoNextSld() { if( gIsEndShow ) M_End(); else GoToNextSld() }
function M_GoPrevSld() { if( gIsEndShow ) { history.back(); PPTSld.event.cancelBubble=true; } else GoToPrevSld() }
function M_True() { return true }
function M_End() { window.close( self ) }
function CreateMenuItem( node,text,action,eval )
{
	var e=CreateItem( node )
	e.type="menuitem"
	e.Action=action
	e.IsActive=eval
	e.innerHTML=text

	if( !e.IsActive() )
		e.style.color="threedshadow"
	e.onclick=Perform
	e.onmouseover=Highlight
	e.onmouseout=Deselect
	s=e.style;
	s.fontFamily=sFont
	s.fontSize="8pt"
	s.paddingLeft=2
}
function CreateItem( node )
{
	var elem=PPTSld.document.createElement("DIV")
	node.insertBefore( elem )
	return elem
}
function SetCMBorder( o,ltClr,rbClr )
{
	var s=o.style
	s.backgroundColor="menu"
	s.borderStyle="solid"
	s.borderWidth=1
	s.borderColor=ltClr+" "+rbClr+" "+rbClr+" "+ltClr
}