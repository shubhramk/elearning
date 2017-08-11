import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input, SimpleChanges
} from '@angular/core';

import videojs from 'video.js'


@Component({
  selector: 'video-js',
  templateUrl: './videojs.component.html',
  styles: [`
   
  `]
})
export class VideoJSComponent implements OnInit , AfterViewInit ,OnDestroy{

  private elemID = 'video-' + Math.random().toString(36).slice(2);

  // video asset url
  @Input()  url: any;
  @Output() onMetaData: EventEmitter<any> = new EventEmitter();

  // declare player var
  private player: any;

  // constructor initializes our declared vars
  constructor() {}

  //when data changes
  ngOnChanges(changes: SimpleChanges) {

    let url = changes['url'] || [];
    if (url) {
      if (url['currentValue'] != url['previousValue']) {
        //setTimeout(() => this.addData(), 100);
      }
    }
  }
  ngOnInit() { }


  //initialize the videojs element
  ngAfterViewInit() {

    let self = this;
    let el   = this.elemID;
    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), {}, function() {

      this.preload = true;
      let obj = {action:'READY',data:{}};
      self.onMetaData.emit(obj);
    });

    //on video time update
    this.player.on('timeupdate', function() {
      if(this.readyState()!=0){
        let curTime = self.convertTime(this.currentTime(),25);
        let totalDur = self.convertTime(this.duration(),25);
        let obj = {action:'TIME_UPDATE',data:{curTime:curTime,totalDur:totalDur,orgCurTime:this.currentTime() , orgTotalDur:this.duration()}};
        self.onMetaData.emit(obj);
      }
    });
    //on video play
    this.player.on('play', function() {

      let obj = {action:'PLAY',data:{}};
      self.onMetaData.emit(obj);

    });
    //on video pause
    this.player.on('pause', function() {
      let obj = {action:'PAUSE',data:{}};
      self.onMetaData.emit(obj);
    });
    //on video ended
    this.player.on('ended', function() {
      let obj = {action:'ENDED',data:{}};
      self.onMetaData.emit(obj);
    });
  }

  //on destroy
  ngOnDestroy(){
    if(this.player){
      this.player.dispose();
      this.player = null;
    }
  }

  //play
  play(){
    if(this.player){
      this.player.play();
    }
  }

  //pause
  pause(){
    if(this.player){
      this.player.pause();
    }
  }

  //src
  src(url:any){
    if(this.player){
      this.player.src(url);
      this.player.preload = true;
      let obj = {action:'SRC_ADDED',data:{}};
      this.onMetaData.emit(obj);
    }
  }

  //current time
  currentTime(sec:number){
    if(this.player){
      this.player.currentTime(sec);
      let obj = {action:'SEEKED',data:{}};
      this.onMetaData.emit(obj);
    }
  }
  //show big play
  bigPlayBtn(show:boolean){
    if(this.player){
      if(show){
        this.player.bigPlayButton.show()
      }else{
        this.player.bigPlayButton.hide()
      }

    }
  }
  //convert time
  convertTime(input, fps) {
      let pad = function(input) {return (input < 10) ? "0" + input : input;};
      fps = (typeof fps !== 'undefined' ?  fps : 24 );
      return [
        pad(Math.floor(input / 3600)),
        pad(Math.floor(input % 3600 / 60)),
        pad(Math.floor(input % 60)),
        pad(Math.floor(input * fps % fps))
      ].join(':');
  }

}
