import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/ui';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@landing/home').then((m) => m.LandingFeatureHomeModule),
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('@leaderboard/shell').then(
            (m) => m.LeaderboardFeatureShellModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
