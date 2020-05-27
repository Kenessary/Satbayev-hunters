import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Option } from '../candidate-vote/candidate-vote.component'
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-candidate-votecom',
  templateUrl: './candidate-votecom.component.html',
  styleUrls: ['./candidate-votecom.component.scss']
})
export class CandidateVotecomComponent implements OnInit {

  constructor(private http: HttpClient) { }

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

  ngOnInit(): void {
  }

}
