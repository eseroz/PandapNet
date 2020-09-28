import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import SoruCevapExtra from 'src/pandap-forms-module/models/SoruCevapExtra';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gk-upload',
  templateUrl: './gk-upload.component.html',
  styleUrls: ['./gk-upload.component.css'],
})
export class GkUploadComponent implements OnInit {
  public baseUrl: string = environment.baseUrl;
  ProgressMessage: string;

  @Input() data: Array<SoruCevapExtra>;
  @Input() soruKod: string;

  cevapExtraData: SoruCevapExtra;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
     let cevapExtra = this.data.find((c) => c.SoruKod == this.soruKod);

     console.log(this.soruKod,cevapExtra);

     this.cevapExtraData=cevapExtra;
  }

  onDosyaSil(dosya: any) {
    this.cevapExtraData.Dosyalar = this.cevapExtraData.Dosyalar.filter(
      (c) => c.DosyaAd != dosya.DosyaAd
    );
  }

  onDosyaYuklendi(dosyaAd: string) {

    let dosyaData = { DosyaAd: dosyaAd };
    this.cevapExtraData.Dosyalar.push(dosyaData);

  }

  onFileSelected(event) {
    var selectedFile = event.target.files[0];

    // if (!selectedFile.type.includes('image')) {
    //   alert('Sadece resim dosyası yükleyebilirsiniz');
    //   return;
    // }

    // if (selectedFile.size > 20000000) {
    //   alert('Dosya çok büyük');
    //   return;
    // }

    var url = this.baseUrl + 'UploadFile/yukle';

    const fd = new FormData();

    fd.append(selectedFile.name, selectedFile);

    this.http
      .post<string[]>(url, fd, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        var result = this.getEventMessage(event, selectedFile);

      

        this.ProgressMessage = result;

        if(event.type===4)
        {
          this.ProgressMessage="";
        }
      
       
      });
  }

  private getEventMessage(event: HttpEvent<string[]>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Dosya yükleniyor "${file.name}" / ${file.size}.`;

      case HttpEventType.UploadProgress:
        const percentDone = Math.round((100 * event.loaded) / event.total);
        return ` ${file.name} .....yükleniyor ${percentDone}% `;

      case HttpEventType.Response: {
        this.onDosyaYuklendi(event.body.toString());
        return event.body.toString();
      }
    }
  }
}
