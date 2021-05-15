import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CountersStateService } from '@leaderboard/data-access';
import { UsersStateService } from '@shared/data-access';
import { TeamDTO, UserDTO } from '@shared/models';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'leaderboard-app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCardComponent implements OnInit {
  @Input() team: TeamDTO;
  public teamUsers$: Observable<UserDTO[]>;
  public teamTotalCounter$: Observable<number>;
  constructor(
    private usersStateService: UsersStateService,
    private countersStateService: CountersStateService
  ) {}

  ngOnInit(): void {
    if (this.team) {
      this.teamUsers$ = this.usersStateService.selectItemsByteamId(
        this.team.id
      );

      this.teamTotalCounter$ = this.teamUsers$.pipe(
        mergeMap((users) =>
          this.countersStateService.selectUsersTotalCounter(
            users.map((u) => u.id)
          )
        )
      );
    }
  }
}
