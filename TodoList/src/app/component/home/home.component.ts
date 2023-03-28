import { Component ,OnInit } from '@angular/core';
import { Task } from 'src/app/interface/todo.interface';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("No se pudo obtener la lista de tareas");
    });
  }

  addTask() {
  
    
    this.taskObj.task_name = this.addTaskValue;
    if (this.taskObj.task_name.trim().length === 0 ) { 
      return alert('No se puede registar una tarea con el nombre vacio')
    
    }
    this.crudService.addTask(this.taskObj).subscribe(res => {
      
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("No se pudo actualizar la tarea");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("No se pudo eliminar la tarea");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
