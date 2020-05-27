import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommissionService } from '../../services/commission.service';
import { User } from '../../interfaces';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  commission: User

  constructor(private commissionService: CommissionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
            return this.commissionService.getById(params['id'])
          }
          return of (null)
        }
      )
    )
    .subscribe(
      (commission: User ) => {
          this.commission = commission
          MaterialService.updateTextInputs()
      },
        error => MaterialService.toast(error.error.message)
      ) 
  }

}
