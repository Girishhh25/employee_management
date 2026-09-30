import { Routes } from '@angular/router';

import { EmployeeForm } from './employee-form/employee-form';
import { DepartmentForm } from './department-form/department-form';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeEdit } from './employee-edit/employee-edit';
import { Dashboard } from './dashboard/dashboard';
import { DepartmentList } from './department-list/department-list';
import { DepartmentEdit } from './department-edit/department-edit';

export const routes: Routes = [

  {
    path: '',
    component: Dashboard
  },

  {
    path: 'employee/edit/:id',
    component: EmployeeEdit
  },

  {
    path: 'employee',
    component: EmployeeForm
  },

  {
    path: 'department',
    component: DepartmentForm
  },

  {
    path: 'employees',
    component: EmployeeList
  },

  {
  path: 'departments',
  component: DepartmentList
},

  {
  path: 'department/edit/:id',
  component: DepartmentEdit
},

];