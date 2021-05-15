import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountersStateService } from '@leaderboard/data-access';
import { TeamsStateService, UsersStateService } from '@shared/data-access';
import { TeamDTO, UserDTO } from '@shared/models';
import { Observable } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaderboardCreateTeamComponent } from '../leaderboard-create-team/leaderboard-create-team.component';

@Component({
  selector: 'leaderboard-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public users$: Observable<UserDTO[]>;
  public teams$: Observable<TeamDTO[]>;
  public faPlus = faPlus;

  constructor(
    private teamsStateService: TeamsStateService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.teams$ = this.teamsStateService.selectItems();
  }

  public createTeam() {
    this.modalService.open(LeaderboardCreateTeamComponent);
  }
}
