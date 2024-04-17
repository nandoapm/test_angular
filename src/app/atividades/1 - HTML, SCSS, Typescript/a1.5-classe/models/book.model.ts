import { Publication } from './publication.model';

export class Book extends Publication {
  private _ISBN: string;

  constructor(
    title: string,
    author: string,
    publicationDate: number,
    ISBN: string
  ) {
    super(title, author, publicationDate);
    this._ISBN = ISBN;
  }

  get ISBN(): string {
    return this._ISBN;
  }

  description(): string {
    return `${super.description()}, ISBN: ${this._ISBN}`;
  }
}
