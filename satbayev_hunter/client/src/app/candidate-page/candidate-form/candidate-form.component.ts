import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Observable, of } from 'rxjs';
import { Candidate, Vote } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { VoteService } from 'src/app/shared/services/vote.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {
  vote: Vote
  form: FormGroup
  pdf: File
  candidate: Candidate 

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  textFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private candidateService: CandidateService,
              private voteService: VoteService,
              private httpservice: HttpService,
              private route: ActivatedRoute,
              private router: Router) { 

  }

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
            return this.candidateService.getById(params['id'])
          }
          return of (null)
        }
      )
    )
    .subscribe(
      (candidate: Candidate) => {
        if(candidate){
          this.candidate = candidate
          this.form.patchValue({
            name: candidate.name,
            surname: candidate.surname,
            email: candidate.email,
            phone: candidate.phone,
            position: candidate.position,
            faculty: candidate.faculty,
            docsSrc : candidate.docsSrc
          })
        }
        MaterialService.updateTextInputs()
        this.form.enable()
      },
        error => MaterialService.toast(error.error.message)
      ) 
  }

  deleteCandidate(){
    const decision = window.confirm(`Вы уверены, что хотите удалить кандидат "${this.candidate.name}"`)

    if (decision){
      this.candidateService.delete(this.candidate._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          ()=> this.router.navigate(['/candidate'])
        )
    } 
  }


  onSubmit(){
    this.voteService.create(this.form.value).subscribe(
      vote =>{
        this.vote = vote
        this.candidateService.delete(this.candidate._id)
        .subscribe(
          response => MaterialService.toast("Добавлено к голосованию"),
          error => MaterialService.toast(error.error.message),
          ()=> this.router.navigate(['/candidate'])
        )
      }, error=>{
        MaterialService.toast(error.error.message)
      }
    )
  }

  send(){
    let user = {
      email: this.emailFormControl.value,
      text: this.textFormControl.value
    }
    this.httpservice.sendEmail("http://localhost:5000/api/sendmail", user).subscribe(
      data => {
        let res : any = data; 
        console.log(
          `Сообщение успешно отправлена`
        );
      },
      err => {
        console.log(err);
      }
    )
  }

}
