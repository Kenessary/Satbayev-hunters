import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  @Input() candidates: Candidate[]
  constructor() { }

  ngOnInit(){
  }

}
