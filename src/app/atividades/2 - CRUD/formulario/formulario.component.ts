import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from './cep.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  constructor(
    private cepService: CepService,
    private dialogRef: MatDialogRef<FormularioComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public pessoa: any
  ) {}

  form = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
    logradouro: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.pessoa) {
      this.form.patchValue({
        id: this.pessoa.id,
        nome: this.pessoa.nome,
        email: this.pessoa.email,
        senha: this.pessoa.senha,
        cep: this.pessoa.cep,
        logradouro: this.pessoa.logradouro,
      });
    } else {
      this.form.patchValue({
        id: this.gerarIdUnico(),
      });
    }
  }

  buscarLogradouro() {
    const cep = this.form.get('cep')?.value;

    if (cep) {
      this.cepService.buscarCep(cep).subscribe((data: any) => {
        if (!data.erro) {
          this.form.get('logradouro')?.setValue(data.logradouro);
        } else {
          this.form.get('cep')?.setErrors({ cepNaoEncontrado: true });
        }
      });
    }
  }

  submeterFormulario() {
    const novaPessoa = this.form.value;

    this.dataService.currentData.pipe(take(1)).subscribe((data) => {
      const newData = [...data];

      const index = newData.findIndex((pessoa) => pessoa.id === novaPessoa.id);

      index !== -1 ? (newData[index] = novaPessoa) : newData.push(novaPessoa);

      this.dataService.listaDePessoas(newData);
    });

    this.dialogRef.close();
  }

  gerarIdUnico(): string {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }
}
