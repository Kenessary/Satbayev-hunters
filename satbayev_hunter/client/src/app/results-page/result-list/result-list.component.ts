import { Component, OnInit, Input } from '@angular/core';
import { Voteresult } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  @Input() votesres: Voteresult[]

  constructor() { }

  ngOnInit(): void {
  }

}
