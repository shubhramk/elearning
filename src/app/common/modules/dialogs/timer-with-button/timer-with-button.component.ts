import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input, SimpleChanges
} from '@angular/core';

import {Subscription} from 'rxjs/Rx';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'timer-with-button',
  templateUrl: './timer-with-button.component.html',
  styles: [`
   
  `]
})
export class TimerWithBtnComponent implements OnInit , AfterViewInit ,OnDestroy{

  @Output() onActionClicked: EventEmitter<any> = new EventEmitter();

  ticks:number = 0;
  meterWidth:number = 0;
  private timerSubscribe: Subscription;
  // constructor initializes our declared vars
  constructor() {}

  ngOnInit() {
    let self = this;
    this.ticks = 5;
    let timer  = TimerObservable.create(0,1000);

    this.timerSubscribe = timer.subscribe((t)=>{
      this.ticks =  5 - t;
      this.meterWidth =  (t / 5) * 100;
      if(this.ticks < 1){
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
    this.timerSubscribe.unsubscribe();
  }

  //on btn clicked
  onBtnClicked(action:string){
    if(action == 'YES'){
      let obj = {action:'OK_BTN_CLICKED',data:{}};
      this.onActionClicked.emit(obj);
    }else if(action == 'NO'){
      let obj = {action:'CANCEL_BTN_CLICKED',data:{}};
      this.onActionClicked.emit(obj);
    }

    this.timerSubscribe.unsubscribe();
  }

}
