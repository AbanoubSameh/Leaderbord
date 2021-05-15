import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEffects } from './state/effects';
import { reducer as userReducer } from "./state/reducer";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UsersStateModule { }
