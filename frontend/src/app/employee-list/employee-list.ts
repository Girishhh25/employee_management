import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [NgFor],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Employee List Loaded');
    this.getEmployees();
  }

  getEmployees(): void {

    console.log('Calling Employee GET');

    this.employeeService.getEmployees().subscribe({

      next: (response: any) => {

        console.log('Employee GET Response:', response);

        this.employees = response;

        // Tell Angular to update the screen
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Employee GET Error:', error);
      }

    });
  }

  editEmployee(employee: any) {
    this.router.navigate(['/employee/edit', employee.id]);
  }

  deleteEmployee(id: number): void {

  const confirmed = confirm(
    'Are you sure you want to delete this employee?'
  );

  if (!confirmed) {
    return;
  }

  this.employeeService.deleteEmployee(id).subscribe({

    next: (response) => {

      console.log('Employee deleted successfully:', response);

      // Remove employee from the current list
      this.employees = this.employees.filter(
        employee => employee.id !== id
      );

    },

    error: (error) => {
      console.error('Error deleting employee:', error);
    }

  });
}


}