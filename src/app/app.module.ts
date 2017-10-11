import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule ,  ReactiveFormsModule} from "@angular/forms";
import { HttpModule, JsonpModule } from '@angular/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotFoundComponent} from "./modules/not-found/not-found.component";
import {AppComponent} from "./app.component";
import {appRouting} from "./common/routing/app.routing";
import {HomeComponent} from "./modules/home/home.component";
import {VideoModule} from "./common/modules/video/video.module";
import {Scene1Component} from "./modules/scene1/scene1.component";
import {Broadcaster} from "./common/services/broadcaster.service";
import {DialogsModule} from "./common/modules/dialogs/dialogs.module";
import {LandingComponent} from "./modules/landing/landing.component";
import {DummyComponent} from "./modules/dummy-module/dummy.component";
import {Scene2Component} from "./modules/scene2/scene2.component";
import {IntroComponent} from "./modules/intro/intro.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    VideoModule.forRoot(),
    DialogsModule.forRoot(),
    appRouting
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    Scene1Component,
    Scene2Component,
    DummyComponent,
    IntroComponent,
    NotFoundComponent
  ],
  providers: [
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
