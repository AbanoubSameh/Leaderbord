import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardTeamComponent } from './pages/leaderboard-team/leaderboard-team.component';
import { LeaderboardDataResolver } from './services/leaderboard-data-resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { counters: LeaderboardDataResolver },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'teams/:id', component: LeaderboardTeamComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderboardFeatureRoutingModule {}
