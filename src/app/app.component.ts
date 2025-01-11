import { Component } from '@angular/core';
import { SustainabilityTrackerComponent } from './components/sustainability-tracker/sustainability-tracker.component';

@Component({
  selector: 'app-root',
  template: `<app-sustainability-tracker></app-sustainability-tracker>`,
  standalone: true,
  imports: [SustainabilityTrackerComponent]
})
export class AppComponent {
  title = 'sustainability-tracker-frontend';
}