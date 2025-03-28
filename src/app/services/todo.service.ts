import { Injectable } from '@angular/core';
import { PoStorageService } from '@po-ui/ng-storage';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoListSource = new BehaviorSubject<Array<Todo>>([]);
  private lockedSource = new BehaviorSubject(false);

  currentTodoList = this.todoListSource.asObservable();
  currentLocked = this.lockedSource.asObservable();

  constructor(private poStorageService: PoStorageService) {
    this.poStorageService.get('todoList').then(data => {
      this.todoListSource.next(data);
    })
  }

  async addTodo(todo: Todo) {
    await this.poStorageService.requestIdlePromise();

    this.poStorageService.lock();

    this.poStorageService.appendItemToArray('todoList', todo).then(data => {
      this.todoListSource.next(data);
    });

    this.poStorageService.unlock();
  }

  async removeTodo(todo: Todo) {
    this.poStorageService.limitedCallWrap(async () => {
      const data = await this.poStorageService.removeItemFromArray('todoList', 'name', todo.name);

      this.todoListSource.next(data);
    })
  }
}
