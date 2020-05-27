import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { VoteresultService } from '../shared/services/voteresult.service';
import { Voteresult, Filter } from '../shared/interfaces';
import { Subscription } from 'rxjs';

const STEP = 4

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  vSub : Subscription
  isFilterVisible = false
  offset = 0
  limit = STEP
  votesres: Voteresult[] = []
  filter: Filter = {}

  loading = false
  reloading = false
  noMoreOrders = false


  constructor(private voteresultService: VoteresultService) { }

  ngOnInit(){
    this.reloading = true
    this.fetch()
  }

  
  private fetch(){
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    }) 
    this.vSub = this.voteresultService.fetch(params).subscribe(votes =>{
      this.votesres = this.votesres.concat(votes)
      this.noMoreOrders = votes.length < STEP
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
    this.votesres = []
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
