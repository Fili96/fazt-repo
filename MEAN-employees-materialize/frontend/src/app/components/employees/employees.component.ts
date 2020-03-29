import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';


declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {

   }

  //Cuando la aplicacion Inicie
  ngOnInit() {
    this.getEmployees();
  }

  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee;
    }
  }

  /**
   * Crea un nuevo empleado en la API de MongoDB
   * recibe un formulario de angular ngForm
   * @param form 
   */
  addEmployee(form: NgForm){
    /*si existe el id oculto, significa que quiero usar el 
    formulario para actualizar los datos de algun registro
    ya existente*/
    if (form.value._id) {
      if (form.value == null) {
        alert('hola');
      }
      this.employeeService.putEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Update Employeed Successfuly'});
        this.getEmployees();
      });
    }else{
      //Agrega si el id oculto no existe, son nuevos datos
      this.employeeService.postEmployee(form.value)
    .subscribe(res => {
      this.resetForm(form);
      M.toast({html: 'Save Employeed Successfuly'});
      this.getEmployees();
    });
    }
    
  }

  /**
   * Recupera los empleados de la API de MongoDB
   */
  getEmployees(){
    this.employeeService.getEmployees()
    .subscribe( res => {
      this.employeeService.employees = res as Employee[];
      /*muestra la respuesta del servidor por consola
      console.log(res);
      */
    });
  }

  /**
   * Actualiza un empleado de la API de MongoDB 
   * Recibe un empleado con estructura definida en el modelo
   * @param employee 
   */
  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  /**
   * Elimina un empleado en la API de MongoDB por medio del ID
   * Recibe una cadena string con el ID de MongoDB
   * @param _id 
   */
  deleteEmployee(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deletEmployee(_id)
      .subscribe(respuesta => {
        this.getEmployees();
        M.toast({html: 'Delete Employeed Successfuly'});
      });
    }
  }

}
