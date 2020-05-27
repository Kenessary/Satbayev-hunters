import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-votecom-list',
  templateUrl: './votecom-list.component.html',
  styleUrls: ['./votecom-list.component.css']
})
export class VotecomListComponent implements OnInit {
  @Input() votes: Vote[]

  constructor() { }

  ngOnInit(): void {
  }

}
