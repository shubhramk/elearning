import {Component, OnInit, ViewChild, AfterViewInit, forwardRef, Inject} from '@angular/core';
import {Broadcaster} from "../../common/services/broadcaster.service";
import {HomeComponent} from "../home/home.component";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
@Component({

  styleUrls: ['./scene1.component.scss'],
  templateUrl: './scene1.component.html'
})
export class Scene1Component implements OnInit,AfterViewInit {
  @ViewChild('vid1') vid1;

  videoURL = [{src:'assets/videos/missing-test-results.mp4',type:'video/mp4' ,poster: 'assets/images/missing-test-results.JPG'}];
  showTimerButton:boolean = false;
  showKeyTrackComponent:boolean = false;
  showTryAgainComponent:boolean = false;
  showRetryText:boolean = false;
  showNoDescComponent:boolean = false;
  randomID:number;

  constructor(
    private broadcaster: Broadcaster,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {

    let self = this;
    //listening events from other components
    this.broadcaster.on<string>('VID_PLAYER')
      .subscribe(obj => {
        switch (obj['action']){
          case "PLAY":
            this.vid1.play();
            break;
          case "PAUSE":
            this.vid1.pause();
            break;
          case "PLAY_OTHER_VID":
            this.vid1.src([{src:'assets/videos/missing-test-results.mp4',type:'video/mp4',poster: 'assets/images/missing-test-results.JPG'}]);
            break;
        }
      });
  }

  //on video meta data
  onVidMetaData(obj){
    switch (obj.action){
      case "READY":
       this.vid1.play();
      break;
      case "SRC_ADDED":
        this.vid1.play();
      break;
      case "PLAY":
        this.broadcaster.broadcast('VID_PLAYER',{action:'PLAY'});
      break;
      case "PAUSE":
        this.broadcaster.broadcast('VID_PLAYER',{action:'PAUSE'});
      break;
      case "SEEKED":
       // this.vid1.play();
        break;
      case "ENDED":
        console.log('ENDED');
        this.broadcaster.broadcast('OPEN_MENU');
      break;
      case "TIME_UPDATE":
        let data = obj['data'];
        if(data['orgCurTime'] >= 33 && data['orgCurTime'] <= 34){
          this.vid1.bigPlayBtn(false);
          this.vid1.pause();
          this.showTryAgainComponent = true;
        }
        if(data['orgCurTime'] >= 40 && data['orgCurTime'] <= 41){
         // this.vid1.bigPlayBtn(false);
         // this.vid1.pause();
         // this.showTimerButton = true;
        }
        if(data['orgCurTime'] >= 60 && data['orgCurTime'] <= 61){
          this.vid1.bigPlayBtn(false);
          this.vid1.pause();
          this.showKeyTrackComponent = true;
        }
        //console.log(data['orgCurTime'] +' >> '+ data['totalDur']);
      break;
    }
  }

  //on timer action component events
  actionSelected:boolean = false;
  onTimerCompActionClicked(obj,calledFrom){
    this.actionSelected = false;
    switch (obj.action){
      case "OK_BTN_CLICKED":
        if(calledFrom == 'simple'){
          this.showTimerButton = false;
          this.vid1.currentTime(43);
        }else  if(calledFrom == 'retry'){
          this.vid1.currentTime(44);
          this.showTryAgainComponent = false;
        }
        this.actionSelected  = true;
        this.vid1.play();

        break;
      case "CANCEL_BTN_CLICKED":
        if(calledFrom == 'simple'){
          this.vid1.currentTime(0);
          this.vid1.play();
          this.actionSelected = true;
          this.showTimerButton = false;

        }else  if(calledFrom == 'retry'){
          this.showTryAgainComponent = false;
          this.showRetryText = true;
          //let self = this;
          // setTimeout(function () {
          //   self.showRetryText = false;
          //   self.showNoDescComponent = true;
          //
          // },3000);
          //this.showTryAgainComponent = true;
          this.showRetryText = false;
          this.showNoDescComponent = true;
        }

        break;
      case "TIMER_COMPLETE":
        if(!this.actionSelected){

          if(calledFrom == 'simple'){
            this.showTimerButton = false;
            this.vid1.src([{src:'assets/videos/missing-test-results.mp4',type:'video/mp4',poster: 'assets/images/missing-test-results.JPG'}]);
          }else  if(calledFrom == 'retry'){
            this.showTryAgainComponent = false;
            this.showRetryText = true;
            let self = this;
            setTimeout(function () {
              self.showRetryText = false;
              self.vid1.currentTime(32);
              self.vid1.play();
            },2000);
          }

        }
        break;
    }
  }

  //on key track component
  onKeyTracked(obj){
    let self = this;
    switch (obj.action){
      case "TIMER_COMPLETE":
        console.log('TIMER_COMPLETE');
        setTimeout(function () {
          self.showKeyTrackComponent = false;
          self.vid1.currentTime(63);
          self.vid1.play();
        },2000);
        break;
    }
  }

  //show no desc popup
  clickNoDescPopup(){
    this.showNoDescComponent = false;
    this.vid1.currentTime(45);
    this.vid1.play();
  }

}
