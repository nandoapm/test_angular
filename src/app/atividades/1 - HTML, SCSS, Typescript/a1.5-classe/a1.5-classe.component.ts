import { Component, OnInit } from '@angular/core';

import { Book } from './models/book.model';
import { Periodical } from './models/periodical';

@Component({
  selector: 'app-a1.5-classe',
  templateUrl: './a1.5-classe.component.html',
  styleUrls: ['./a1.5-classe.component.scss'],
})
export class A15ClasseComponent implements OnInit {
  _book!: Book;
  _periodical!: Periodical;

  constructor() {}

  ngOnInit(): void {
    this._book = new Book(
      'O Senhor dos Anéis',
      'J.R.R. Tolkien',
      1954,
      '978-0-395-19395-7'
    );
    this._periodical = new Periodical(
      'New York Times',
      'The New York Times Company',
      1851,
      '0362-4331'
    );
  }
}
