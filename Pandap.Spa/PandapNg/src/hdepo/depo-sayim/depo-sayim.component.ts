import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplexInnerSubscriber } from 'rxjs/internal/innerSubscribe';
import { DateFromUTCPipe } from 'src/pandap-forms/_utils/DateFromUTCPipe';
import { HdepoService } from '../hdepo.service';
import { STOKTANIM } from '../_models/STOKTANIM';


@Component({
  selector: 'app-depo-sayim',
  templateUrl: './depo-sayim.component.html',
  styleUrls: ['./depo-sayim.component.css'],
})
export class DepoSayimComponent implements OnInit {
  @ViewChild('content') myDivElementRef: ElementRef;
  @ViewChild('txtMiktar') txtMiktarRef: ElementRef;
  @ViewChild('txtSearch') txtSearchRef: ElementRef;
  Stok: STOKTANIM = null;
  StokListe: STOKTANIM[] = [];
  closeResult: string;

  constructor(
    public dataService: HdepoService,
    public modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.StokListe = await this.dataService.depoSayimListeGetir();
  }

  async barkodAra(searchValue: string) {
    if (searchValue.length > 3) {
      let stok = await this.dataService.StokTanimBul(searchValue);
      console.log(stok);

      if (stok !== null) {
        this.Stok = stok;
        await this.openModal();
      }
    }
  }

  openModal() {


    let content = this.myDivElementRef;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Kapatıldı: ${result}`;

          let sonuc = this.dataService.StokTanimGuncelle(this.Stok);

          this.StokListe.push(this.Stok);

          this.txtSearchRef.nativeElement.value = '';
        },
        (reason) => {
          console.log('reddedildi');
          this.closeResult = `İptal ${this.getDismissReason(reason)}`;

          this.txtSearchRef.nativeElement.value = '';
        }
      );
  }

  async EkranYenile() {
    this.StokListe = await this.dataService.depoSayimListeGetir();

    alert('Ekran Güncellendi');
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
