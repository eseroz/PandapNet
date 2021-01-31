import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Makine } from './makine';

@Component({
  selector: 'app-periyodik-bakim',
  templateUrl: './periyodik-bakim.component.html',
  styleUrls: ['./periyodik-bakim.component.css']
})
export class PeriyodikBakimComponent implements OnInit {
  
  public MakineListesi: Makine[];

  constructor( private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.MakineListesi = await this.http
    .get<Makine[]>(
      `${environment.apiUrl}/BakimMakineParca/Makineler`
    )
    .toPromise();
  }

}
