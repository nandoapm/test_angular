import { Publication } from './publication.model';

export class Periodical extends Publication {
  private _ISSN: string;

  constructor(
    title: string,
    author: string,
    publicationDate: number,
    ISSN: string
  ) {
    super(title, author, publicationDate);
    this._ISSN = ISSN;
  }

  get ISSN(): string {
    return this._ISSN;
  }

  description(): string {
    return `${super.description()}, ISSN: ${this._ISSN}`;
  }
}
