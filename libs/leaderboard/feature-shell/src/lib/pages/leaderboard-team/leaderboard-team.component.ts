import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounterDTO, CountersStateService } from '@leaderboard/data-access';
import { UsersStateService } from '@shared/data-access';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { UserDTO, UUID } from '@shared/models';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaderboardCreateUserComponent } from '../leaderboard-create-user/leaderboard-create-user.component';

@Component({
  selector: 'leaderboard-app-leaderboard-team',
  templateUrl: './leaderboard-team.component.html',
  styleUrls: ['./leaderboard-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardTeamComponent implements OnInit {
  public faPlus = faPlus;
  public faArrowLeft = faArrowLeft;
  public teamId$: Observable<UUID>;
  public teamUsers$: Observable<UserDTO[]>;
  public counters$: Observable<CounterDTO[]>;
  private teamId: UUID;
  constructor(
    private route: ActivatedRoute,
    private usersStateService: UsersStateService,
    private countersStateService: CountersStateService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.teamId$ = this.route.params.pipe(
      map((params) => params.id),
      filter((id) => !!id),
      tap((teamId) => (this.teamId = teamId))
    );
    this.teamUsers$ = this.teamId$.pipe(
      mergeMap((teamId) => this.usersStateService.selectItemsByteamId(teamId))
    );
    this.counters$ = this.teamUsers$.pipe(
      mergeMap((users) =>
        this.countersStateService.selectUsersCounter(users.map((u) => u.id))
      )
    );
  }

  public getUserCounter(counters: CounterDTO[] = [], userId: UUID): CounterDTO {
    return counters.find((c) => c.userId === userId);
  }

  public incrementCounter(counterId: UUID) {
    this.countersStateService.dispatchIncrementItemValue(counterId);
  }
  public createUser() {
    const creatUserModel = this.modalService.open(
      LeaderboardCreateUserComponent
    );
    console.log('hey',this.teamId)
    creatUserModel.componentInstance.teamId = this.teamId;;
  }
}
