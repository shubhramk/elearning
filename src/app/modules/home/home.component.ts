import { Component, OnInit,AfterViewInit } from '@angular/core';
import {Broadcaster} from "../../common/services/broadcaster.service";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {ConstantConfig} from "../../common/config/constant.config";
@Component({

  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit,AfterViewInit {


  isHomeClicked:boolean = false;
  isVideoPlaying:boolean = false;
  isFullScreen:boolean = false;
  routeID:string = '';
  menuID:string  = '';
  sideNavigation:Array<Object> = ConstantConfig.SIDE_NAV;


  constructor(private broadcaster: Broadcaster ,
              private router:Router,
              private activatedRoute: ActivatedRoute
  ) {

    //track selected section and highlight respective tab
    let events = this.router.events;
    events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        // Traverse the active route tree
        let snapshot  = activatedRoute.snapshot;
        let activated = activatedRoute.firstChild;
        if(activated != null) {
          while (activated != null) {
            snapshot = activated.snapshot;
            activated = activated.firstChild;
          }
        }

        this.routeID   = snapshot.data['routeID'];
        this.menuID    = snapshot.data['menuID'];
      }
    });
  }

  ngOnInit() {
    //open menu
    this.broadcaster.on<string>('OPEN_MENU')
      .subscribe(() => {
        this.isHomeClicked = true;
      });
  }

  ngAfterViewInit() {

    //register video Events
    this.broadcaster.on<string>('VID_PLAYER')
      .subscribe(obj => {
        switch (obj['action']){
          case "PLAY":
            this.isVideoPlaying = true;
            break;
          case "PAUSE":
            this.isVideoPlaying = false;
            break;
          case "ENDED":
            this.isVideoPlaying = false;
            break;
        }
      });
  }

  //on Menu Clicked
  onMenuClicked(item){
    switch (item['menuID']){
      case "HOME":
          this.isHomeClicked = true;
        break;
      default:
        this.isHomeClicked = false;
        this.router.navigate([item['path']]);
        break;
    }
  }
  //play scene
  playScene(name:string){
    this.isHomeClicked = false;
    this.router.navigateByUrl(name);
    window.location.reload();
    //this.broadcaster.broadcast('VID_PLAYER',{action:'PLAY_OTHER_VID',sceneName:name});
  }

  //on toggle play pause
  onTogglePlayPause(){
    this.isVideoPlaying = !this.isVideoPlaying;
    if(this.isVideoPlaying){
      this.broadcaster.broadcast('VID_PLAYER',{action:'PLAY'});
    }else{
      this.broadcaster.broadcast('VID_PLAYER',{action:'PAUSE'});
    }
  }

  //toggle full screen
  toggleFullScreen(){
    this.isFullScreen = !this.isFullScreen;
    this.fullScreen(this.isFullScreen);
  }

  fullScreen(status:boolean){
    if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document)
    {
      if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document['mozFullScreenEnabled'] || document['msFullscreenEnabled'])
      {
        var element = document.getElementById("main-container");
        if(status){
          if("requestFullscreen" in element) {
            element.requestFullscreen();
          } else if ("webkitRequestFullscreen" in element) {
            element.webkitRequestFullscreen();
          } else if ("mozRequestFullScreen" in element) {
            element['mozRequestFullScreen']();
          } else if ("msRequestFullscreen" in element) {
            element['msRequestFullscreen']();
          }
        }else{
          if("exitFullscreen" in element) {
            document.exitFullscreen();
          } else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
          } else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
          } else if (document.webkitExitFullscreen) {
            document['webkitExitFullscreen']();
          }
        }

      }
    }
    else {
      console.log("User doesn't allow full screen");
    }
  }
}
