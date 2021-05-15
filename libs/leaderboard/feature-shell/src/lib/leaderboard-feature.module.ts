import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaderboardFeatureRoutingModule } from './leaderboard-feature-routing.module';
import { LeaderboardDataAccessModule } from '@leaderboard/data-access';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { LeaderboardTeamComponent } from './pages/leaderboard-team/leaderboard-team.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap/';
import { LeaderboardCreateTeamComponent } from './pages/leaderboard-create-team/leaderboard-create-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaderboardCreateUserComponent } from './pages/leaderboard-create-user/leaderboard-create-user.component';
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LeaderboardFeatureRoutingModule,
    LeaderboardDataAccessModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    TeamCardComponent,
    LeaderboardTeamComponent,
    LeaderboardCreateTeamComponent,
    LeaderboardCreateUserComponent,
  ],
})
export class LeaderboardFeatureShellModule {}
