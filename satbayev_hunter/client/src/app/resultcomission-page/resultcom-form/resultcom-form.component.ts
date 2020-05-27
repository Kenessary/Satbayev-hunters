import { Component, OnInit } from '@angular/core';
import { Voteresult } from 'src/app/shared/interfaces';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { VoteresultService } from 'src/app/shared/services/voteresult.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-resultcom-form',
  templateUrl: './resultcom-form.component.html',
  styleUrls: ['./resultcom-form.component.css']
})
export class ResultcomFormComponent implements OnInit {

  voteres: Voteresult
  form: FormGroup

  constructor(private voteService: VoteresultService,
              private route: ActivatedRoute) { }

  ngOnInit(){
        
    this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
            return this.voteService.getById(params['id'])
          }
          return of (null)
        }
      )
    )
    .subscribe(
      (voteres: Voteresult) => {
        if(voteres){
          this.voteres = voteres
        }
      },
        error => MaterialService.toast(error.error.message)
      )
  }

  }

