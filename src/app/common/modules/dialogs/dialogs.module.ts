import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TimerWithBtnComponent} from "./timer-with-button/timer-with-button.component";


@NgModule({
  imports: [CommonModule],
  declarations: [
    TimerWithBtnComponent
  ],
  exports: [TimerWithBtnComponent],
  entryComponents: [
    TimerWithBtnComponent
  ]

})
export class DialogsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogsModule
    }
  }
}
