import { Component, ViewChild } from '@angular/core';
import { PoButtonModule, PoFieldModule, PoModalComponent, PoModalModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { PoStorageModule } from '@po-ui/ng-storage';
import { TodoService } from './services/todo.service';
import { Todo } from './services/todo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    PoTableModule,
    PoButtonModule,
    PoModalModule,
    PoStorageModule,
    PoFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todoList: Array<Todo> = [];

  todoForm!: FormGroup;

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'name',
      label: 'Nome'
    },
    {
      property: 'description',
      label: 'Descrição'
    },
    {
      property: 'component.delete',
      label: 'Actions',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.handleDelete.bind(this),
          icon: 'an an-trash',
          tooltip: 'Remover',
          value: ''
        }
      ]
    }
  ];

  constructor(private todoService: TodoService) {
    this.todoService.currentTodoList.subscribe(todoList => {
      this.todoList = todoList;
    });

    this.todoForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
  }

  handleCloseModal() {
    this.poModal.close();
    this.todoForm.reset();
  }

  handleSubmit() {
    this.todoService.addTodo(this.todoForm.value);

    this.handleCloseModal();
  }

  handleDelete(todo: Todo) {
    this.todoService.removeTodo(todo);
  }
}
