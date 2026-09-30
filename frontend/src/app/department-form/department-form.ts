import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../department';

@Component({
  selector: 'app-department-form',
  imports: [FormsModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css'
})
export class DepartmentForm {

  @Output() departmentAdded = new EventEmitter<void>();

  successMessage = false;

  department = {
    name: '',
    location: ''
  };

  constructor(private departmentService: DepartmentService) {}

  addDepartment() {

    this.departmentService.addDepartment(this.department).subscribe({

      next: (response) => {

        console.log('Department added successfully:', response);

        // Show success message
        this.successMessage = true;

        // Clear form
        this.department = {
          name: '',
          location: ''
        };

        this.departmentAdded.emit();

        // Hide message after 5 seconds
        setTimeout(() => {
          this.successMessage = false;
        }, 5000);
      },

      error: (error) => {
        console.error('Error adding department:', error);
      }

    });
  }
}