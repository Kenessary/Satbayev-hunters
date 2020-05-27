import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-candidatesite-layout',
  templateUrl: './candidatesite-layout.component.html',
  styleUrls: ['./candidatesite-layout.component.css']
})
export class CandidatesiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  constructor(private router: Router) { }

  ngAfterViewInit(){
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

}
