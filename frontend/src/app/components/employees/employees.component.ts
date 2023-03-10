import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  editEmployee: Employee | undefined;
  deleteEmployee: Employee | undefined;

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  // GET
  getEmployees(): void {
    this._employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  // CREATE
  onAddEmployee(addForm: NgForm): void {
    if(!addForm.value.imageUrl) {
      const randomNumber = Math.floor(Math.random() * 8) + 1;
      addForm.value.imageUrl = "https://bootdey.com/webroot/img/Content/avatar/avatar" + randomNumber + ".png";
    }
    this._employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
        addForm.reset(); //vaciar formulario
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }
  // UPDATE
  onUpdateEmployee(employee: Employee): void {
    this._employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  // DELETE
  onDeleteEmployee(employeeId: number): void {
    this._employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  // ABRIRA UN MODAL U OTRO SEGUN TIPO DE ACCION(ADD,EDIT O DELETE)
  // onOpenModal('add'), onOpenModal('edit', employee), onOpenModal('delete', employee)
  onOpenModal(mode: string, employee?: Employee): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (container) {
      container.appendChild(button);
    }

    button.click();
  }
  // buscador para empleados
  searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

}
