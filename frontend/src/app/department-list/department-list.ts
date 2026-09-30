import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { DepartmentService } from '../department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  imports: [NgFor],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentList implements OnInit {

  departments: any[] = [];

  constructor(
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {

    this.departmentService.getDepartments().subscribe({

      next: (response: any) => {

        console.log('Departments:', response);

        this.departments = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error getting departments:', error);
      }

    });
  }

  editDepartment(department: any) {

  this.router.navigate([
    '/department/edit',
    department.id
  ]);
}

  deleteDepartment(id: number): void {

  const confirmed = confirm(
    'Are you sure you want to delete this department?'
  );

  if (!confirmed) {
    return;
  }

  this.departmentService.deleteDepartment(id).subscribe({

    next: (response) => {

      console.log(
        'Department deleted successfully:',
        response
      );

      // Remove deleted department from the displayed list
      this.departments = this.departments.filter(
        department => department.id !== id
      );

    },

    error: (error) => {
      console.error(
        'Error deleting department:',
        error
      );
    }

  });
}
}