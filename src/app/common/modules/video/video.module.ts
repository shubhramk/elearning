import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VideoJSComponent} from "./videojs/videojs.component";


@NgModule({
  imports: [CommonModule],
  declarations: [
    VideoJSComponent
  ],
  exports: [VideoJSComponent],
  entryComponents: [
    VideoJSComponent
  ]

})
export class VideoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VideoModule
    }
  }
}
