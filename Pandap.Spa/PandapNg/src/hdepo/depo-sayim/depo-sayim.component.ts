import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HdepoService } from '../hdepo.service';
import Quagga from 'quagga';
import { strict } from 'assert';

@Component({
  selector: 'app-depo-sayim',
  templateUrl: './depo-sayim.component.html',
  styleUrls: ['./depo-sayim.component.css']
})
export class DepoSayimComponent implements OnInit {

  StokListe=[];
  errorMessage="";

  constructor(public dataService:HdepoService) {
  }


  barkodOku=()=>
  {
    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment' // restrict camera type
        },
        area: { // defines rectangle of the detection
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader'] // restrict code types
      },
    },
    (err) => {
      if (err) {
        this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
      } else {
        Quagga.start();
        Quagga.onDetected((res) => {
          this.onBarcodeScanned(res.codeResult.code);
        });
      }
    });
  }

  async ngOnInit() {
    this.StokListe=await this.dataService.depoSayimListeGetir();
  }

  ngAfterViewInit(): void {
   
    
    
  }

  onBarcodeScanned(code: string) {
    console.log(code);
  }

}
