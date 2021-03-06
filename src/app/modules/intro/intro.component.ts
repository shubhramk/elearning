import {Component, OnInit, ViewChild, AfterViewInit, forwardRef, Inject} from '@angular/core';
import {Broadcaster} from "../../common/services/broadcaster.service";

@Component({

  styleUrls: ['./intro.component.scss'],
  templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit,AfterViewInit {
  @ViewChild('vid1') vid1;
  videoURL = [];
  hideContinueBtn:boolean = false;
  constructor(private broadcaster: Broadcaster,) {}
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.vid1.bigPlayBtn(false);
  }

  //on show menu
  showMenu(){
    this.hideContinueBtn = true;
    this.broadcaster.broadcast('OPEN_MENU');
  }


}
