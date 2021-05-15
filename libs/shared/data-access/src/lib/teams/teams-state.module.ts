import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamEffects } from './state/effects';
import { reducer as teamReducer } from "./state/reducer";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('teams', teamReducer),
    EffectsModule.forFeature([TeamEffects]),
  ]
})
export class TeamsStateModule { }
