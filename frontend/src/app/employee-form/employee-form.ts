import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  @Output() employeeAdded = new EventEmitter<void>();

  successMessage = false;

  employee = {
    name: '',
    email: '',
    department: '',
    designation: ''
  };

  constructor(private employeeService: EmployeeService) {}

  addEmployee() {
  this.employeeService.addEmployee(this.employee).subscribe({
    next: (response) => {
      console.log('Employee added successfully:', response);

      this.successMessage = true;

      this.employee = {
        name: '',
        email: '',
        department: '',
        designation: ''
      };

      setTimeout(() => {
        this.successMessage = false;
      }, 5000);
    },

    error: (error) => {
      console.error('Error adding employee:', error);
    }
  });
}
}