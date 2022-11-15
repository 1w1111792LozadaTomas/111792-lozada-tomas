import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-carga',
  templateUrl: './spinner-carga.component.html',
  styleUrls: ['./spinner-carga.component.scss']
})
export class SpinnerCargaComponent implements OnInit {

  constructor() { }
  public spinnerCarga;
  ngOnInit(): void {
  }

  cargarSpinner() {
    this.spinnerCarga = true;
  }

  sacarSpinner() {
    this.spinnerCarga = false;
  }
}
