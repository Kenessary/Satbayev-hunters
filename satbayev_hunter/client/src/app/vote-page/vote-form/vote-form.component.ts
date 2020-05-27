import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Vote } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { VoteService } from 'src/app/shared/services/vote.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.css']
})
export class VoteFormComponent implements OnInit {
  vote: Vote
  form: FormGroup

  constructor(private voteService: VoteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      faculty: new FormControl(null, Validators.required),
      docsSrc: new FormControl(null)
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
      (vote: Vote) => {
        if(vote){
          this.vote = vote
        }
      },
        error => MaterialService.toast(error.error.message)
      )
  }

  
  deleteVote(){
    const decision = window.confirm(`Вы уверены, что хотите удалить кандидат "${this.vote.name}"`)

    if (decision){
      this.voteService.delete(this.vote._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          ()=> this.router.navigate(['/vote'])
        )
    } 
  }

  

}
