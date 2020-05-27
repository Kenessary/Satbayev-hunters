import { Component, OnInit, Input } from '@angular/core';
import { Voteresult } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-resultcom-list',
  templateUrl: './resultcom-list.component.html',
  styleUrls: ['./resultcom-list.component.css']
})
export class ResultcomListComponent implements OnInit {
  @Input() votesres: Voteresult[]

  constructor() { }

  ngOnInit(): void {
  }

}
