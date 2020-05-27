import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-Charts'



import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRountingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CandidateLayoutComponent } from './shared/layouts/candidate-layout/candidate-layout.component';
import { CandidatesiteLayoutComponent } from './shared/layouts/candidatesite-layout/candidatesite-layout.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { CandidatePageComponent } from './candidate-page/candidate-page.component';
import { CommissionPageComponent } from './commission-page/commission-page.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CandidateFormComponent } from './candidate-page/candidate-form/candidate-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommissionDetailComponent } from './commission-page/commission-detail/commission-detail.component';
import { AdminsiteLayoutComponent } from './shared/layouts/adminsite-layout/adminsite-layout.component';
import { LoginadminPageComponent } from './loginadmin-page/loginadmin-page.component';
import { VotecommissionPageComponent } from './votecommission-page/votecommission-page.component';
import { ResultcomissionPageComponent } from './resultcomission-page/resultcomission-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CandidatesFilterPipe } from './shared/candidates-filter.pipe';
import { CandidateVoteComponent } from './candidate-page/candidate-vote/candidate-vote.component';
import { PusherService } from './pusher.service';
import { ChartsComponent } from './candidate-page/charts/charts.component';
import { VoteFormComponent } from './vote-page/vote-form/vote-form.component';
import { VotesFilterPipe } from './vote-page/votes-filter.pipe';
import { VotesresultFilterPipe } from './results-page/results-filter.pipe';
import { ResultsFormComponent } from './results-page/results-form/results-form.component';
import { CandidateListComponent } from './candidate-page/candidate-list/candidate-list.component';
import { CandidateFilterComponent } from './candidate-page/candidate-filter/candidate-filter.component';
import { VoteFilterComponent } from './vote-page/vote-filter/vote-filter.component';
import { VoteListComponent } from './vote-page/vote-list/vote-list.component';
import { ResultListComponent } from './results-page/result-list/result-list.component';
import { ResultFilterComponent } from './results-page/result-filter/result-filter.component';
import { ResultcomFilterComponent } from './resultcomission-page/resultcom-filter/resultcom-filter.component';
import { ResultcomListComponent } from './resultcomission-page/resultcom-list/resultcom-list.component';
import { ResultcomFormComponent } from './resultcomission-page/resultcom-form/resultcom-form.component';
import { VotecomFormComponent } from './votecommission-page/votecom-form/votecom-form.component';
import { VotecomListComponent } from './votecommission-page/votecom-list/votecom-list.component';
import { VotecomFilterComponent } from './votecommission-page/votecom-filter/votecom-filter.component';
import { LoaderrComponent } from './shared/components/loaderr/loaderr.component';
import { StatsComponent } from './candidate-page/charts/stats/stats.component';
import { ChartscomComponent } from './candidate-page/chartscom/chartscom.component';
import { CandidateVotecomComponent } from './candidate-page/candidate-votecom/candidate-votecom.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MainPageComponent,
    CandidateLayoutComponent,
    CandidatesiteLayoutComponent,
    SubmissionPageComponent,
    CandidatePageComponent,
    CommissionPageComponent,
    VotePageComponent,
    ResultsPageComponent,
    LoaderComponent,
    CandidateFormComponent,
    CommissionDetailComponent,
    AdminsiteLayoutComponent,
    LoginadminPageComponent,
    VotecommissionPageComponent,
    ResultcomissionPageComponent,
    NotfoundPageComponent,
    AboutPageComponent,
    CandidatesFilterPipe,
    VotesFilterPipe,
    VotesresultFilterPipe,
    CandidateVoteComponent,
    ChartsComponent,
    VoteFormComponent,
    ResultsFormComponent,
    CandidateListComponent,
    CandidateFilterComponent,
    VoteFilterComponent,
    VoteListComponent,
    ResultListComponent,
    ResultFilterComponent,
    ResultcomFilterComponent,
    ResultcomListComponent,
    ResultcomFormComponent,
    VotecomFormComponent,
    VotecomListComponent,
    VotecomFilterComponent,
    LoaderrComponent,
    StatsComponent,
    ChartscomComponent,
    CandidateVotecomComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    PusherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
