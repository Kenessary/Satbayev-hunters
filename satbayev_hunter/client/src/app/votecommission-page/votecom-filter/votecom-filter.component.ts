import { Component, OnInit, OnDestroy, AfterViewInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-votecom-filter',
  templateUrl: './votecom-filter.component.html',
  styleUrls: ['./votecom-filter.component.css']
})
export class VotecomFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef

  constructor() { }

  start: MaterialDatepicker
  end: MaterialDatepicker
  name: string
  surname: string
  
  isValid = true

  ngOnDestroy(){
    this.start.destroy()
    this.end.destroy()
  }

  ngAfterViewInit(){
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
}


validate(){
  if(!this.start.date || !this.end.date){
    this.isValid = true
    return
  }

  this.isValid = this.start.date < this.end.date
}

submitFilter(){
  const filter: Filter = {}

  if(this.name){
    filter.name = this.name
  }
  if(this.surname){
    filter.surname = this.surname
  }

  if(this.start.date){
    filter.start = this.start.date
  }

  if(this.end.date){
    filter.end = this.end.date
  }

  this.onFilter.emit(filter)
}
}
