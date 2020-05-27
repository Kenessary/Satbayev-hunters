import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { VoteService } from '../shared/services/vote.service';
import { Vote, Filter } from '../shared/interfaces';
import { Subscription } from 'rxjs';

const STEP = 4

@Component({
  selector: 'app-votecommission-page',
  templateUrl: './votecommission-page.component.html',
  styleUrls: ['./votecommission-page.component.css']
})
export class VotecommissionPageComponent implements OnInit , OnDestroy, AfterViewInit{

  vSub : Subscription
  isFilterVisible = false
  offset = 0
  limit = STEP
  votes: Vote[] = []
  filter: Filter = {}

  loading = false
  reloading = false
  noMoreOrders = false

  constructor(private voteService: VoteService) { }

  ngOnInit(){
    this.reloading = true
    this.fetch()
  }

  private fetch(){
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    }) 
    this.vSub = this.voteService.fetch(params).subscribe(votes =>{
      this.votes = this.votes.concat(votes)
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
    this.votes = []
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
