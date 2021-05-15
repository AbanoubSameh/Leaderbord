import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LandingFeatureHomeRoutingModule } from './landing-feature-home-routing.module';

@NgModule({
  imports: [CommonModule,LandingFeatureHomeRoutingModule],
  declarations: [HomeComponent],
})
export class LandingFeatureHomeModule {}
