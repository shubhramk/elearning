import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NotFoundComponent} from '../../modules/not-found/not-found.component';
import {HomeComponent} from "../../modules/home/home.component";
import {Scene1Component} from "../../modules/scene1/scene1.component";
import {LandingComponent} from "../../modules/landing/landing.component";
import {DummyComponent} from "../../modules/dummy-module/dummy.component";
import {Scene2Component} from "../../modules/scene2/scene2.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'scene1',
        component: Scene1Component,
      },
      {
        path: 'scene2',
        component: Scene2Component,
      },
      { path: '**', component: DummyComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
