import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountersStateModule } from './counters/counters-state.module';

@NgModule({
  imports: [CommonModule, CountersStateModule],
})
export class LeaderboardDataAccessModule {}
