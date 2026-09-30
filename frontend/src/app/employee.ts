import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8000/api/employees/';

  constructor(private http: HttpClient) {}

  addEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployees() {
    return this.http.get(this.apiUrl);
}

  getEmployee(id: number) {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  updateEmployee(id: number, employee: any) {
    return this.http.put(
      `${this.apiUrl}${id}/`,
      employee
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}