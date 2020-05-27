import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces';
import { CommissionService } from '../shared/services/commission.service';

@Component({
  selector: 'app-commission-page',
  templateUrl: './commission-page.component.html',
  styleUrls: ['./commission-page.component.css']
})
export class CommissionPageComponent implements OnInit {

  commissions$: Observable<User[]>

  constructor(private commissionService: CommissionService) { }

  ngOnInit() {
    this.commissions$ = this.commissionService.fetch()
  }

}
