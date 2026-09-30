import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee';

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css'
})
export class EmployeeEdit implements OnInit {

  employeeId!: number;
  successMessage = false;

  employee = {
    name: '',
    email: '',
    department: '',
    designation: ''
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.employeeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (response: any) => {
        this.employee = response;
      },
      error: (error) => {
        console.error('Error getting employee:', error);
      }
    });

  }

  updateEmployee(): void {

  this.employeeService
    .updateEmployee(this.employeeId, this.employee)
    .subscribe({

      next: (response) => {

        console.log('Employee updated successfully:', response);

        this.successMessage = true;

        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 1500);
      },

      error: (error) => {
        console.error('Error updating employee:', error);
      }

    });
}

}