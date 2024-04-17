export class Publication {
  protected _title: string;
  protected _author: string;
  protected _publicationDate: number;

  constructor(title: string, author: string, publicationDate: number) {
    this._title = title;
    this._author = author;
    this._publicationDate = publicationDate;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get publicationDate(): number {
    return this._publicationDate;
  }

  description(): string {
    return `Título: ${this._title}, author: ${this._author}, Ano de Publicação: ${this.publicationDate}`;
  }
}
