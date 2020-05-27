import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  selectedPosition = 0;
  positions  = this.getPosition();

  onSelectPosition(position_id: number) {
    this.selectedPosition = position_id;
  }
  
  getPosition() {
    return [
    { id: 1, name: 'Лектор' },
    { id: 2, name: 'Ассоциированный профессор' },
    { id: 3, name: 'Заведующий(ая) кафедры' },
    { id: 4, name: 'Профессор' },
    { id: 5, name: 'Ассистент' },
    { id: 6, name: 'Сениор-лектор' },
    { id: 7, name: 'Ассистент-профессор' },
    { id: 8, name: 'Тьютор' }
    ];
    }

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()
    this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams:{
            registered : true
          }
        })

      }, 
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }

    )
  }

}
