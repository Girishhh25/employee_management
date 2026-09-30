import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department';

@Component({
  selector: 'app-department-edit',
  imports: [FormsModule],
  templateUrl: './department-edit.html',
  styleUrl: './department-edit.css'
})
export class DepartmentEdit implements OnInit {

  departmentId!: number;

  successMessage = false;

  department = {
    name: '',
    location: ''
  };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.departmentId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.departmentService
      .getDepartment(this.departmentId)
      .subscribe({

        next: (response: any) => {
          this.department = response;
        },

        error: (error) => {
          console.error(
            'Error getting department:',
            error
          );
        }

      });
  }

  updateDepartment(): void {

    this.departmentService
      .updateDepartment(
        this.departmentId,
        this.department
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Department updated successfully:',
            response
          );

          this.successMessage = true;

          setTimeout(() => {
            this.router.navigate(['/departments']);
          }, 1500);
        },

        error: (error) => {
          console.error(
            'Error updating department:',
            error
          );
        }

      });
  }
}