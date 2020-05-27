import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import { CommissionService } from 'src/app/shared/services/commission.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';


@Component({
  selector: 'app-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.css']
})
export class CommissionDetailComponent implements OnInit {

  form: FormGroup
  commission: User


  constructor(private commissionService: CommissionService,
    private route: ActivatedRoute,
    private router: Router) { }

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
  deleteCommission(){
    const decision = window.confirm(`Вы уверены, что хотите удалить члена коммисси "${this.commission.fullname}"`)

    if (decision){
      this.commissionService.delete(this.commission._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          ()=> this.router.navigate(['/commission'])

        )
    }
  }
  onSubmit(){}

}
