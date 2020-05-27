import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CandidateService } from '../shared/services/candidate.service';
import { Candidate, Filter } from '../shared/interfaces';
import { Observable, Subscription } from 'rxjs';


const STEP = 4

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css']
})
export class CandidatePageComponent implements OnInit, OnDestroy, AfterViewInit {
  vSub : Subscription
  isFilterVisible = false
  offset = 0
  limit = STEP
  candidates: Candidate[] = []
  filter: Filter = {}

  
  loading = false
  reloading = false
  noMoreOrders = false



  constructor(private candidateService: CandidateService) { }

  ngOnInit(){
    this.reloading = true
    this.fetch()
  }

  private fetch(){
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    }) 
    this.vSub = this.candidateService.fetch(params).subscribe(candidates =>{
      this.candidates = this.candidates.concat(candidates)
      this.noMoreOrders = candidates.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore(){
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy(){
    this.vSub.unsubscribe()
  }

  applyFilter(filter: Filter){
    this.candidates = []
    this.filter = filter
    this.offset = 0
    this.reloading = true
    this.fetch()  
  }
  
  ngAfterViewInit(){
  }

  isFiltered(): boolean{
    return Object.keys(this.filter).length !==0
  }

  refresh(){
    window.location.reload()
  }
  
}
