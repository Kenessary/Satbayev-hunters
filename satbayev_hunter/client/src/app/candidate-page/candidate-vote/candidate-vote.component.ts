import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Candidate } from '../../shared/interfaces'
import { ChartsComponent } from '../charts/charts.component'
import { FormGroup, FormControl } from '@angular/forms';


export interface Option {
  label: string;
  selected: boolean;
  value: string;
}


@Component({
  selector: 'app-candidates-vote',
  templateUrl: './candidate-vote.component.html',
  styleUrls: ['./candidate-vote.component.scss']
})
export class CandidateVoteComponent implements OnInit {

  chart: ChartsComponent;


  constructor(private http: HttpClient) {}

  selectedOption = null;
  options: Option[] = [
    {
      label: 'Достоин',
      selected: false,
      value: 'Достоин'
    },
    {
      label: 'Не достоин', 
      selected: false, 
      value: 'Недостоин'
    }
  ];

  censusData = {
    'Недостоин': 0,
    'Достоин': 0
  };

  takeVote(index) {
    const selectedOption = this.options[index];
    if (!selectedOption.selected) {
      this.http
        .post('http://localhost:5000/api/voted', selectedOption)
        .subscribe((res: Option) => {
          const options = this.options.map(
            (option, i) => (index === i ? { ...res } : { ...option })
          );
          this.options = [...options];
          this.selectedOption = res.value;
        });
    }
    else{
      MaterialService.toast('Вы уже проголосовали');
    }
  }
  onNewEntry(data) {
    this.censusData[data.value] += 1;
  }

  onSubmit(){}


  ngOnInit() {
 
  }

}
