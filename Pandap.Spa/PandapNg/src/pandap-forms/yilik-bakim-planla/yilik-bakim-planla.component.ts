import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Makine } from '../yilik-bakim-planla/makine';

@Component({
  selector: 'app-yilik-bakim-planla',
  templateUrl: './yilik-bakim-planla.component.html',
  styleUrls: ['./yilik-bakim-planla.component.css']
})
export class YilikBakimPlanlaComponent implements OnInit {


  public MakineListesi: Makine[];


  constructor(    
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { 

  }

  async ngOnInit(): Promise<void>  {
    this.MakineListesi = await this.http
    .get<Makine[]>(
      `${environment.apiUrl}/BakimMakineParca/Makineler`
    )
    .toPromise();
  }




  
}
