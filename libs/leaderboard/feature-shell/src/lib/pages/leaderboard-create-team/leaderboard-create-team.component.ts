import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsStateService } from '@shared/data-access';
import { filter, take } from 'rxjs/operators';
@Component({
  selector: 'leaderboard-app-leaderboard-create-team',
  templateUrl: './leaderboard-create-team.component.html',
  styleUrls: ['./leaderboard-create-team.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LeaderboardCreateTeamComponent implements OnInit {
  public createTeamForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private teamsStateService: TeamsStateService
  ) {}

  ngOnInit(): void {
    this.initTeamForm();
  }

  public createTeam() {
    if (this.createTeamForm.valid) {
      this.teamsStateService.dispatchAddItem(this.createTeamForm.value);
      this.teamsStateService
        .selectIsSuccess()
        .pipe(
          filter((isSuccess) => isSuccess),
          take(1)
        )
        .subscribe((x) => this.activeModal.close());
    }
  }
  private initTeamForm() {
    this.createTeamForm = this.fb.group({
      name: [, Validators.required],
    });
  }
}
