import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TimerWithBtnComponent} from "./timer-with-button/timer-with-button.component";
import {KeyTrackComponent} from "./key-track/key-track.component";


@NgModule({
  imports: [CommonModule],
  declarations: [
    TimerWithBtnComponent,
    KeyTrackComponent
  ],
  exports: [TimerWithBtnComponent,KeyTrackComponent],
  entryComponents: [
    TimerWithBtnComponent,
    KeyTrackComponent
  ]

})
export class DialogsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogsModule
    }
  }
}
