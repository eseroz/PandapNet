import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HdepoService } from '../hdepo.service';
import { STOKTANIM } from '../_models/STOKTANIM';

@Component({
  selector: 'app-depo-sayim',
  templateUrl: './depo-sayim.component.html',
  styleUrls: ['./depo-sayim.component.css']
})
export class DepoSayimComponent implements OnInit {
  @ViewChild('content') myDivElementRef: ElementRef;
  Stok:STOKTANIM=null;
  StokListe:Array<STOKTANIM>=null;
  closeResult: string;

  constructor(public dataService: HdepoService,public modalService: NgbModal) {}


  ngOnInit(): void {
  }

  async barkodAra(searchValue: string)
  {
    if(searchValue.length>3)
    {

      let stok = await this.dataService.StokTanimBul(searchValue);
      console.log(stok);

      if(stok!==null)
      {
        this.Stok=stok;

        this.openModal();
      }
    
    }

  }

   openModal() {

    let content=this.myDivElementRef;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("onaylandı");
    }, (reason) => {
      console.log("reddedildi");
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
