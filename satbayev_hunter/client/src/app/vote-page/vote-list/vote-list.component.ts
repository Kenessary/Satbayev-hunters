import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.css']
})
export class VoteListComponent implements OnInit {
  @Input() votes: Vote[]
  constructor() { }

  ngOnInit(): void {
  }

}
