import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input, SimpleChanges, HostListener
} from '@angular/core';

import {Subscription} from 'rxjs/Rx';
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Component({
  selector: 'key-track',
  templateUrl: './key-track.component.html',
  styles: [`
   
  `]
})
export class KeyTrackComponent implements OnInit , AfterViewInit ,OnDestroy{

  @Output() onActionClicked: EventEmitter<any> = new EventEmitter();

  key:any ;
  counter:number = 0;
  ticks:number = 0;
  meterWidth:number = 0;
  timerSubscribe: Subscription;
  timeOver:boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if(event.ctrlKey && event.shiftKey && event.keyCode == 76){
      this.counter++;
    }else{
      if(this.counter > 0){
        this.counter-= 1;
      }

    }
  }

  // constructor initializes our declared vars
  constructor() {}

  ngOnInit() {
    this.ticks = 30;
    let timer  = TimerObservable.create(0,1000);

    this.timerSubscribe = timer.subscribe((t)=>{
      this.ticks =  30 - t;
      if(this.counter > 3){
        this.counter-= 3;
      }

      let val = Math.round(( this.counter / 100) * 100);
      this.meterWidth =  val > 100? 100  : val;

      if(this.ticks < 1){
        this.timeOver = true;
        this.timerSubscribe.unsubscribe();
        let obj = {action:'TIMER_COMPLETE',data:{}};
        this.onActionClicked.emit(obj);
      }
    });
  }

  //initialize the videojs element
  ngAfterViewInit() {

  }

  //on destroy
  ngOnDestroy(){
    this.timeOver = true;
    this.timerSubscribe.unsubscribe();
  }

}
