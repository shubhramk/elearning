import {Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import {Broadcaster} from "../../common/services/broadcaster.service";
@Component({

  styleUrls: ['./scene1.component.scss'],
  templateUrl: './scene1.component.html'
})
export class Scene1Component implements OnInit,AfterViewInit {
  @ViewChild('vid1') vid1;
  videoURL = [{src:'assets/videos/missing-test-results.mp4',type:'video/mp4'}];
  showTimerButton:boolean = false;

  constructor( private broadcaster: Broadcaster) {}
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
            this.vid1.src([{src:'assets/videos/missing-test.mp4',type:'video/mp4'}]);
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
        console.log('SEEKED');
        break;
      case "ENDED":
        console.log('ENDED');
      break;
      case "TIME_UPDATE":
        let data = obj['data'];
        if(data['orgCurTime'] >= 5){
          this.vid1.bigPlayBtn(false);
          this.vid1.pause();
          this.showTimerButton = true;
        }
        //console.log(data['orgCurTime'] +' >> '+ data['totalDur']);
      break;
    }
  }

  //on timer action component events
  actionSelected:boolean = false;
  onTimerCompActionClicked(obj){
    this.actionSelected = false;
    switch (obj.action){
      case "OK_BTN_CLICKED":
        this.showTimerButton = false;
        this.actionSelected  = true;
        this.vid1.src([{src:'assets/videos/respectful-disclosure.mp4',type:'video/mp4'}]);
        break;
      case "CANCEL_BTN_CLICKED":

        this.actionSelected = true;
        break;
      case "TIMER_COMPLETE":
        if(!this.actionSelected){
          this.showTimerButton = false;
          this.vid1.src([{src:'assets/videos/missing-test-results.mp4',type:'video/mp4'}]);
        }
        break;
    }
  }
}
