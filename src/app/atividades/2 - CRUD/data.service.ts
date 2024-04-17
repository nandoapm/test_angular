import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();

  constructor() {}

  listaDePessoas(data: any[]) {
    this.dataSource.next(data);
  }

  removerPessoa(pessoa: any) {
    const currentData = this.dataSource.getValue();

    const newData = currentData.filter((p: any) => p.id !== pessoa.id);

    this.listaDePessoas(newData);
  }
}
