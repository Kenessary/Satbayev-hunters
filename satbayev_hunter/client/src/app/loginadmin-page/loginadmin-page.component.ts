import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { AuthadminService } from '../shared/services/authadmin.service';

@Component({
  selector: 'app-loginadmin-page',
  templateUrl: './loginadmin-page.component.html',
  styleUrls: ['./loginadmin-page.component.css']
})
export class LoginadminPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthadminService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      secretword: new FormControl(null, [Validators.required])
    })

    this.route.queryParams.subscribe((params: Params)=>{
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные')
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в систему')
      } else if (params['sessionFailed']){
        MaterialService.toast('Пожалуйста войдите в систему заного')
      }

    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      ()=> this.router.navigate(['/candidate']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
