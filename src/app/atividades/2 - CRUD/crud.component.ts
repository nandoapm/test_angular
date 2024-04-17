import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private dataService: DataService) {}

  private unsubscribe$: Subject<void> = new Subject<void>();

  filtro = new FormControl();

  displayedColumns: string[] = [
    'actions',
    'nome',
    'email',
    'senha',
    'cep',
    'logradouro',
  ];

  dataSource: any[] = [];
  listaFiltrada: any[] = [];

  ngOnInit(): void {
    this.dataService.currentData.subscribe((data) => {
      this.dataSource = data;
    });

    this.filtro.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((valor) => {
        this.filtrar(valor);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filtrar(arg: string) {
    console.log('filtrando...'); //não remover essa linha

    if (!arg) {
      this.listaFiltrada = this.dataSource;
    } else {
      const filtro = arg.toLowerCase();
      this.listaFiltrada = this.dataSource.filter((item) =>
        item.nome.toLowerCase().includes(filtro)
      );
    }
  }

  abrirFormulario() {
    this.dialog.open(FormularioComponent);
  }

  editar(pessoa: Pessoa) {
    this.dialog.open(FormularioComponent, { data: pessoa });
  }

  remover(pessoa: Pessoa) {
    if (!confirm(`Deseja remover a pessoa ${pessoa.nome}`)) return;

    this.dataService.removerPessoa(pessoa);
  }
}

class Pessoa {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public cep: number,
    public logradouro: string
  ) {}
}
