import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {  metaReducers, reducers } from '.';
import { UsersStateModule } from './users/users-state.module';
import { TeamsStateModule } from './teams/teams-state.module';
import { environment } from '@environments';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  imports: [
    CommonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    UsersStateModule,
    TeamsStateModule,
    EffectsModule.forRoot([]),
  ],
})
export class SharedDataAccessModule {}
