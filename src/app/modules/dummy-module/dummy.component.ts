import { Component, OnInit,AfterViewInit } from '@angular/core';
import {Broadcaster} from "../../common/services/broadcaster.service";
import {Router} from "@angular/router";

@Component({

  styleUrls: ['./dummy.component.scss'],
  templateUrl: './dummy.component.html'
})
export class DummyComponent implements OnInit,AfterViewInit {

  constructor(private broadcaster: Broadcaster , private route:Router ) {}

  ngOnInit() {}
  ngAfterViewInit() {}

  //on enter button click
  onEnterButtonClick(){
    this.route.navigate(['home/scene1']);
  }
}
