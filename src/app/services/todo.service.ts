import { Injectable } from '@angular/core';
import { PoStorageService } from '@po-ui/ng-storage';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoListSource = new BehaviorSubject<Array<Todo>>([]);

  currentTodoList = this.todoListSource.asObservable();

  constructor(private poStorageService: PoStorageService) {
    this.poStorageService.get('todoList').then(data => {
      this.todoListSource.next(data);
    })
  }

  addTodo(todo: Todo) {
    this.poStorageService.appendItemToArray('todoList', todo).then(data => {
      this.todoListSource.next(data);
    })
  }

  removeTodo(todo: Todo) {
    this.poStorageService.removeItemFromArray('todoList', 'name', todo.name).then(data => {
      this.todoListSource.next(data);
    })
  }
}
