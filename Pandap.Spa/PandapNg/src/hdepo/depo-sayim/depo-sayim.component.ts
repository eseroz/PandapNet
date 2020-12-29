import {  Component, OnInit, ViewChild } from '@angular/core';
import { HdepoService } from '../hdepo.service';


@Component({
  selector: 'app-depo-sayim',
  templateUrl: './depo-sayim.component.html',
  styleUrls: ['./depo-sayim.component.css'],
})
export class DepoSayimComponent implements OnInit {
  StokListe = [];
  errorMessage = '';

  @ViewChild('modalForm') modalForm; 

  isModalOpen=false;

  constructor(public dataService: HdepoService) {}


  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  ngOnInit() {
    //this.StokListe = await this.dataService.depoSayimListeGetir();
  }

  barkodAra(searchValue: string)
  {
    if(searchValue.length>3)
    {
      console.log(searchValue);
      this.isModalOpen=true;

      console.log(this.modalForm.nativeElement);
      
   
    }

    
   
  }

  ngAfterViewInit() {
 
  }

 
}
