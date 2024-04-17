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
      'Harry Potter e a Pedra Filosofal',
      'J.K. Rowling',
      1997,
      '978-85-325-0725-2'
    );
    this._periodical = new Periodical(
      'Revista Brasileira de Ciência da Computação',
      'Revista Brasileira',
      2021,
      '2238-3579'
    );
  }
}
