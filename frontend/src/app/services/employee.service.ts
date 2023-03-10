import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private serverUrl: string;
  private endpoint: string;

  constructor(private http: HttpClient) {
    // URL del servidor backend
    this.serverUrl = environment.serverURL;
    this.endpoint = '/employees';
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.serverUrl + this.endpoint);
  }

  findEmployee(idEmployee: number): Observable<Employee> {
    return this.http.get<Employee>(this.serverUrl + this.endpoint + "/find/" + idEmployee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.serverUrl + this.endpoint + "/add", employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.serverUrl + this.endpoint + "/update", employee);
  }

  deleteEmployee(idEmployee: number): Observable<void> {
    return this.http.delete<void>(this.serverUrl + this.endpoint + "/delete/" + idEmployee);
  }

}
