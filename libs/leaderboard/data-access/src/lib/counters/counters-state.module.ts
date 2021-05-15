import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterEffects } from './state/effects';
import { reducer as counterReducer } from "./state/reducer";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('counters', counterReducer),
    EffectsModule.forFeature([CounterEffects]),
  ]
})
export class CountersStateModule { }
