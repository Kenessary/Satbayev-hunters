import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CandidateLayoutComponent } from './shared/layouts/candidate-layout/candidate-layout.component';
import { CandidatesiteLayoutComponent } from './shared/layouts/candidatesite-layout/candidatesite-layout.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthadminGuard } from './shared/classes/authadmin.guard';
import { CandidatePageComponent } from './candidate-page/candidate-page.component';
import { CommissionPageComponent } from './commission-page/commission-page.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { CandidateFormComponent } from './candidate-page/candidate-form/candidate-form.component';
import { CommissionDetailComponent } from './commission-page/commission-detail/commission-detail.component';
import { AdminsiteLayoutComponent } from './shared/layouts/adminsite-layout/adminsite-layout.component';
import { LoginadminPageComponent } from './loginadmin-page/loginadmin-page.component';
import { VotecommissionPageComponent } from './votecommission-page/votecommission-page.component';
import { ResultcomissionPageComponent } from './resultcomission-page/resultcomission-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CandidateVoteComponent } from './candidate-page/candidate-vote/candidate-vote.component';
import { VoteFormComponent } from './vote-page/vote-form/vote-form.component';
import { ResultsFormComponent } from './results-page/results-form/results-form.component';
import { VotecomFormComponent } from './votecommission-page/votecom-form/votecom-form.component';
import { ResultcomFormComponent } from './resultcomission-page/resultcom-form/resultcom-form.component';

const routes: Routes = [
    {path:'', redirectTo: '/main', pathMatch: 'full'},
    {path: 'error', component: NotfoundPageComponent},
    {
        path: '', component: AuthLayoutComponent, children:[
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent},
            {path: 'loginadmin', component: LoginadminPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, /*canActivate:[AuthGuard],*/ children:[
            {path: 'votecommission', component: VotecommissionPageComponent},
            {path: 'votecommission/:id', component: VotecomFormComponent},
            {path: 'resultcommission', component: ResultcomissionPageComponent},
            {path: 'resultcommission/:id', component: ResultcomFormComponent}

        ]
    },
    {
        path: '', component: AdminsiteLayoutComponent, /*canActivate:[AuthadminGuard],*/ children:[
            {path: 'candidate', component: CandidatePageComponent},
            {path: 'candidate/:id', component: CandidateFormComponent},
            {path: 'commission', component: CommissionPageComponent},
            {path: 'commission/:id', component: CommissionDetailComponent},
            {path: 'vote', component: VotePageComponent},
            {path: 'vote/:id', component: VoteFormComponent},
            {path: 'results', component: ResultsPageComponent},
            {path: 'results/:id', component: ResultsFormComponent},


        ]
    },
    {
        path: '', component: CandidateLayoutComponent, children:[
            {path: 'main', component: MainPageComponent},
        ]
    },
    {
        path: '', component: CandidatesiteLayoutComponent, children:[
            {path: 'submission', component: SubmissionPageComponent},
            {path: 'about', component: AboutPageComponent},

        ]
    },
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRountingModule {

}