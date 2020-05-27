import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthadminService } from '../../services/authadmin.service';


@Component({
  selector: 'app-adminsite-layout',
  templateUrl: './adminsite-layout.component.html',
  styleUrls: ['./adminsite-layout.component.css']
})
export class AdminsiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/candidate', name:'Кандидаты'},
    {url: '/commission', name:'Комиссия'},
    {url: '/vote', name:'Голосования'},
    {url: '/results', name:'Результаты конкурса'}
  ]

  constructor( private auth: AuthadminService,
                private router: Router
  ) { }

  ngAfterViewInit(){
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/loginadmin'])
  }

}
