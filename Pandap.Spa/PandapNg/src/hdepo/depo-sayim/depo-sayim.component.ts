import {  Component, OnInit } from '@angular/core';
import { HdepoService } from '../hdepo.service';
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-depo-sayim',
  templateUrl: './depo-sayim.component.html',
  styleUrls: ['./depo-sayim.component.css'],
})
export class DepoSayimComponent implements OnInit {
  StokListe = [];
  errorMessage = '';

  constructor(public dataService: HdepoService) {}


  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  async ngOnInit() {
    this.StokListe = await this.dataService.depoSayimListeGetir();
  }

  ngAfterViewInit(): void {}

 
}
