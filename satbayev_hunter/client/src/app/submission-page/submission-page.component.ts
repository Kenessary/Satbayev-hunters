import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Event, Router } from '@angular/router';
import { CandidateService } from '../shared/services/candidate.service';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { Candidate } from '../shared/interfaces';


@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.scss']
})
export class SubmissionPageComponent implements OnInit, OnDestroy, AfterViewInit {
  
  selectedPosition = 0;
  selectedFaculty = 0;
  
  positions  = this.getPosition();
  faculties = this.getFaculties();
  pdfSize: number;

  onSelectPosition(position_id: number) {
  this.selectedPosition = position_id;
  }
   
  onSelectFaculty(faculty_id: number) {
  this.selectedFaculty = faculty_id;
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

   getFaculties() {
    return [
    //Институт базового образования
    { id: 1, name: `Кафедра общественных дисциплин (Институт базового образования)` },
    { id: 2, name: 'Кафедра Каз и рус языки (Институт базового образования)' },
    { id: 3, name: 'Кафедра Английского языка (Институт базового образования)' },
    { id: 4, name: 'Кафедра Физическая культура (Институт базового образования)' },
    //Институт химических и биологических технологий
    { id: 5, name: 'Кафедра Химической ТОВ (Институт химических и биологических технологий)' },
    { id: 6, name: 'Кафедра Химической ТНВ (Институт химических и биологических технологий)' },
    { id: 7, name: 'Кафедра Биотехнология (Институт химических и биологических технологий)' },
    //Институт промышленной инженерии
    { id: 8, name: 'Кафедра Индустриальная инженерия (Институт промышленной инженерии)' },
    { id: 9, name: 'Кафедра Прикладная М и ИГ (Институт промышленной инженерии)'  },
    { id: 10, name: 'Кафедра Транспортная техника (Институт промышленной инженерии)' },
    { id: 11, name: 'Кафедра Робототехника и ТСА (Институт промышленной инженерии)' },
    { id: 12, name: 'Кафедра Инженерная физика (Институт промышленной инженерии)' },
    //Институт информационных и телекоммуникационных технологий
    { id: 13, name: 'Кафедра Математики (Институт информационных и телекоммуникационных технологий)' },
    { id: 14, name: 'Кафедра Кибербезопасность ОиХИ (Институт информационных и телекоммуникационных технологий)' },
    { id: 15, name: 'Кафедра Программной инженерии (Институт информационных и телекоммуникационных технологий)' },
    { id: 16, name: 'Кафедра Электроники ТиКТ (Институт информационных и телекоммуникационных технологий)' },
    { id: 17, name: 'Кафедра Автоматизации и управления (Институт информационных и телекоммуникационных технологий)' },
    //Институт архитектуры и строительства
    { id: 18, name: 'Кафедра Инженерные СиС (Институт архитектуры и строительства)' },
    { id: 19, name: 'Кафедра Строительства и СМ (Институт архитектуры и строительства)' },
    { id: 20, name: 'Кафедра Архитектуры (Институт архитектуры и строительства)' },
    { id: 21, name: 'Кафедра Энергетики (Институт архитектуры и строительства)' },
    //Горно-металлургический институт
    { id: 22, name: 'Кафедра МД и геодезия (Горно-металлургический институт)' },
    { id: 23, name: 'Кафедра Горное дело (Горно-металлургический институт)' },
    { id: 24, name: 'Кафедра Технологические МиО (Горно-металлургический институт)' },
    { id: 25, name: 'Кафедра Металлургические ПТиТСМ (Горно-металлургический институт)' },
    { id: 26, name: 'Кафедра Металлургия и ОПИ (Горно-металлургический институт)' },
    //Институт геологии и нефтегазового дела
    { id: 27, name: 'Кафедра Геологической СПиРМПИ (Институт геологии и нефтегазового дела)' },
    { id: 28, name: 'Кафедра Геофизики (Институт геологии и нефтегазового дела)' },
    { id: 29, name: 'Кафедра Геологии нефти и газа (Институт геологии и нефтегазового дела)' },
    { id: 30, name: 'Кафедра Нефтяная инженерия (Институт геологии и нефтегазового дела)' }
    ]
    }
   
  @ViewChild('input') inputRef: ElementRef
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  form: FormGroup
  pdfPreview: string | ArrayBuffer;
  pdf: File
  candidate: Candidate

  constructor(private route: ActivatedRoute,
              private router: Router,
              private candidateService: CandidateService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      faculty: new FormControl(null, Validators.required)
    })

    // this.route.params
      // .pipe(
      //   switchMap(
      //     (params: Params) => {
      //       if(params['id']) {
      //         return this.candidateService.getById(params['id'])
      //       }
      //       return of (null)
      //     }
      //   )
      // )
      // .subscribe(
      //   (candidate: Candidate) => {
      //     if(candidate){
      //       this.candidate = candidate
      //       this.form.patchValue({
      //         fullname: candidate.fullname,
      //         email: candidate.email,
      //         phone: candidate.phone,
      //         position: candidate.position,
      //         faculty: candidate.faculty,
      //       })
      //       this.pdfPreview = candidate.docsSrc
      //       MaterialService.updateTextInputs()
      //     }
      //     this.form.enable()
      //   },
      //     error => MaterialService.toast(error.error.message)
      //   )
        
  }

  ngOnDestroy(){
    this.modal.destroy()
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open(){
    this.modal.open()
  }

  cancel(){
    this.modal.close()
    window.location.reload()
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any){
    const file = event.target.files[0]
    this.pdf = file
    this.pdfSize =  Math.round(this.pdf.size / 100000)

    const reader = new FileReader()

    reader.onload = () => {
      this.pdfPreview = reader.result
    }
    reader.readAsDataURL(file)

  }

  onSubmit(){
    let obs$ 
    let empty = ''

    obs$ = this.candidateService.create(
                              this.form.value.name,
                              this.form.value.surname,
                              this.form.value.email,
                              this.form.value.phone,
                              this.form.value.position,
                              this.form.value.faculty,
                              this.pdf)

    obs$.subscribe(
      candidate => {
        this.candidate = candidate
        this.modal.open()
        this.form.reset()
      }, error => {
        this.modal.close()
        MaterialService.toast('Заполните форму')
      }
    )
  }
}
