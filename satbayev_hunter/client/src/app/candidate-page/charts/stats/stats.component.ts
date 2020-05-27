import { Component, OnInit } from '@angular/core';
import { VoteresultService } from 'src/app/shared/services/voteresult.service';
import { VoteService } from 'src/app/shared/services/vote.service';
import { Vote, Voteresult } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  voteresult: Voteresult
  vote: Vote
  form: FormGroup

  constructor(private voteresultService: VoteresultService,
              private voteService: VoteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      position: new FormControl(null),
      posVote: new FormControl(null),
      negVote: new FormControl(null),
      totalvote: new FormControl(null)
  })
  
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
        vote => {
          if(vote){
            this.vote = vote
            this.form.patchValue({
              name: vote.name,
              surname: vote.surname,
              position: vote.position
            })
          }
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  
  onSubmit(){
    this.voteresultService.create(this.form.value).subscribe(
      voteresult => {
        this.voteresult = voteresult
        this.voteService.delete(this.vote._id)
        .subscribe(
          response => MaterialService.toast('Результаты голосования сохранены'),
          error => MaterialService.toast('Сохраните результаты'),
          ()=> this.router.navigate(['/results'])
        )
      }, error =>{
        MaterialService.toast('Сохраните результаты')
      }
    )
  }

}
