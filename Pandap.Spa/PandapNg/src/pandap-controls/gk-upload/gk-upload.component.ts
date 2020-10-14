import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import SoruCevapExtra from 'src/pandap-forms/models/SoruCevapExtra';
import { environment } from '@environments/environment';

@Component({
  selector: 'gk-upload',
  templateUrl: './gk-upload.component.html',
  styleUrls: ['./gk-upload.component.css'],
})
export class GkUploadComponent implements OnInit {
  ProgressMessage: string;

  @Input() dosyalar: string[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.dosyaIsimleri=this.cevapObj.Dosyalar;
  }

  onDosyaSil(dosyaAd: string) {
    const index: number = this.dosyalar.indexOf(dosyaAd);
    this.dosyalar.splice(index, 1);
  }

  onDosyaYuklendi(dosyaAd: string) {
    this.dosyalar.push(dosyaAd);
  }

  onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var url = environment.apiUrl + 'UploadFile/yukle';

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

        if (event.type === 4) {
          this.ProgressMessage = '';
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
