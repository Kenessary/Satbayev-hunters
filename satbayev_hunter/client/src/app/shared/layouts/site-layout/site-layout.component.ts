import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../classes/material.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit{

  commission: User


  links = [
    {url: '/votecommission', name:'Голосования'},
    {url: '/resultcommission', name:'Результаты конкурса'}
  ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(){}

  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
