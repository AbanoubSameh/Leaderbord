import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CountersStateService } from '@leaderboard/data-access';
import { UsersStateService, TeamsStateService } from '@shared/data-access';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardDataResolver implements Resolve<any> {
  constructor(
    private usersStateService: UsersStateService,
    private teamsStateService: TeamsStateService,
    private countersStateService: CountersStateService
  ) {}

  resolve() {
    this.usersStateService.dispatchLoad();
    this.teamsStateService.dispatchLoad();
    this.countersStateService.dispatchLoad();
    return this.countersStateService.selectItems().pipe(take(1));
  }
}
