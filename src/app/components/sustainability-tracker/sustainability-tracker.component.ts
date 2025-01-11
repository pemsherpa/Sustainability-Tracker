import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SustainabilityService, SustainabilityAction } from '../../services/sustainability.service';

@Component({
  selector: 'app-sustainability-tracker',
  templateUrl: './sustainability-tracker.component.html',
  styleUrls: ['./sustainability-tracker.component.css'],
  standalone: true,// Marks the component as standalone (doesn't need a module)
  imports: [CommonModule, ReactiveFormsModule]
})
export class SustainabilityTrackerComponent implements OnInit {
  actions: SustainabilityAction[] = [];
  actionForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private sustainabilityService: SustainabilityService,
    private fb: FormBuilder
  ) {
    this.actionForm = this.fb.group({
      action: ['', Validators.required],
      date: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // When the component loads, fetch the actions from the backend
    this.loadActions();
  }

  loadActions(): void {
    this.sustainabilityService.getActions().subscribe({
      next: (data) => this.actions = data,
      error: () => this.errorMessage = 'Failed to load actions.'
    });
  }

  // Handle form submission to add a new action
  onSubmit(): void {
    if (this.actionForm.valid) {
      this.sustainabilityService.addAction(this.actionForm.value).subscribe({
        next: () => {
          this.successMessage = 'Action added successfully!';
          this.actionForm.reset();
          this.loadActions();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => this.errorMessage = 'Failed to add action.'
      });
    }
  }
}