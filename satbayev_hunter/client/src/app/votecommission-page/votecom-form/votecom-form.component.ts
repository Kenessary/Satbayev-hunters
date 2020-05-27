import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vote } from 'src/app/shared/interfaces';
import { VoteService } from 'src/app/shared/services/vote.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-votecom-form',
  templateUrl: './votecom-form.component.html',
  styleUrls: ['./votecom-form.component.css']
})
export class VotecomFormComponent implements OnInit {

  vote: Vote
  form: FormGroup

  constructor(private voteService: VoteService,
    private route: ActivatedRoute) { }

  ngOnInit(){
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
  }

