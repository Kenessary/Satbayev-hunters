import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Voteresult } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { VoteresultService } from 'src/app/shared/services/voteresult.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-results-form',
  templateUrl: './results-form.component.html',
  styleUrls: ['./results-form.component.css']
})
export class ResultsFormComponent implements OnInit {

  voteres: Voteresult
  form: FormGroup

  constructor(private voteService: VoteresultService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   fullname: new FormControl(null, [Validators.required]),
    //   position: new FormControl(null, Validators.required),
    //   posVote: new FormControl(null),
    //   negVote: new FormControl(null),
    //   totalvote: new FormControl(null)
    // })

    
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

  deleteVote(){
    const decision = window.confirm(`Вы уверены, что хотите удалить кандидат "${this.voteres.name}"`)

    if (decision){
      this.voteService.delete(this.voteres._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          ()=> this.router.navigate(['/results'])
        )
    } 
  }

}
