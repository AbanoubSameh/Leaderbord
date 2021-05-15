import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountersStateService } from '@leaderboard/data-access';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersStateService } from '@shared/data-access';
import { UUID } from '@shared/models';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'leaderboard-app-leaderboard-create-user',
  templateUrl: './leaderboard-create-user.component.html',
  styleUrls: ['./leaderboard-create-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardCreateUserComponent implements OnInit {
  @Input() teamId: UUID;
  public createUserForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public usersStateService: UsersStateService,
    public countersStateService: CountersStateService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initTeamForm();
  }

  public createUser() {
    if (this.createUserForm.valid) {
      this.usersStateService.dispatchAddItem(this.createUserForm.value);
      this.usersStateService
        .selectIsSuccess()
        .pipe(
          filter((isSuccess) => isSuccess),
          take(1)
        )
        .subscribe((x) => this.activeModal.close());
    }
  }
  private initTeamForm() {
    this.createUserForm = this.fb.group({
      name: [, Validators.required],
      teamId: [this.teamId, Validators.required],
    });
  }
}
