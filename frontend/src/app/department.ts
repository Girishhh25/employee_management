import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://127.0.0.1:8000/api/employees/departments/';

  constructor(private http: HttpClient) {}

  addDepartment(department: any) {
    return this.http.post(this.apiUrl, department);
  }

  getDepartments() {
    return this.http.get(this.apiUrl);
  }

  
  getDepartment(id: number) {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  updateDepartment(id: number, department: any) {
    return this.http.put(
      `${this.apiUrl}${id}/`,
      department
    );
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}