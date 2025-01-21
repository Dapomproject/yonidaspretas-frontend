import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-home-detalhes',
  templateUrl: './home-detalhes.component.html',
  styleUrls: ['./home-detalhes.component.scss']
})
export class HomeDetalhesComponent {
  userLogged$: Observable<any> | any;
  contentArray: any = [];

  constructor(
    private publicService: PublicService,
  ) {}

  ngOnInit(): void {
    this.getClientDetail();
  }

  getClientDetail() {
    const ID: any = localStorage.getItem('clientID');
      
    this.publicService.getUsersClientById(ID).subscribe(client => {
      this.contentArray = client;
    });
  }


}
