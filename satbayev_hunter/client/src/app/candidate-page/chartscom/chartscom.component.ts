import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Voteresult, Vote } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { FormGroup } from '@angular/forms';
import { PusherService } from 'src/app/pusher.service';
import { Option } from '../candidate-vote/candidate-vote.component'

@Component({
  selector: 'app-chartscom',
  templateUrl: './chartscom.component.html',
  styleUrls: ['./chartscom.component.scss']
})
export class ChartscomComponent implements OnInit {

  voteresult: Voteresult
  vote: Vote
  form: FormGroup
  up =  MaterialService.updateTextInputs()

  constructor(private pusher: PusherService) { }

  @Input() censusData = {};
  @Output() newEntry: EventEmitter<Option> = new EventEmitter();
  chartType = 'pie';
  chartData = [];
  chartLabels = [];
  totalVote = 0;
  posVotePercent = 0;
  negVotePercent = 0;

  computeData( ) {
    this.chartData = Object.values(this.censusData);
    this.chartLabels = Object.keys(this.censusData);
    this.totalVote = this.getTotalVote();
    this.posVotePercent = Math.round(this.getPosVotePercent());
    this.negVotePercent = Math.round(this.getNegVotePercent());
  }

  getTotalVote() {
    const values: number[] = Object.values(this.censusData);
    return values.reduce((defaultValue, val) => defaultValue + val, 0);
  }

  getPosVotePercent() {
    const total = this.getTotalVote();
    const posVote = Object.keys(this.censusData).reduce((initVal, val) => {
      if (val === 'Достоин') {
        return initVal + this.censusData[val];
      }
      return initVal;
    }, 0) ;
    return posVote / total * 100; 
  }

  
  getNegVotePercent() {
    const total = this.getTotalVote();
    const negVote = Object.keys(this.censusData).reduce((initVal, val) => {
      if (val === 'Недостоин') {
        return initVal + this.censusData[val];
      }
      return initVal;
    }, 0)
    return negVote / total * 100 
  }

  ngOnInit() {
    this.computeData();
    const channel = this.pusher.init();
    channel.bind('new-entry', (data: Option) => {
      this.newEntry.emit(data);
      this.computeData();
      MaterialService.updateTextInputs()
    });
  }

}
