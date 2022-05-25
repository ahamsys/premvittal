import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { FeeComponent } from './fee/fee.component';
import { LoginComponent } from './login/login.component';
import { PendingFeeComponent } from './pending-fee/pending-fee.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: DashboardComponent,
  },
  {
    path: 'editstudent',
    canActivate: [AuthGuardService],
    component: EditStudentComponent
  },
  {
    path: 'fee',
    canActivate: [AuthGuardService],
    component: FeeComponent
  },
  {
    path: 'pendingfee',
    canActivate: [AuthGuardService],
    component: PendingFeeComponent
  },
  {
    path: 'reportcard',
    canActivate: [AuthGuardService],
    component: ReportCardComponent
  },
  {
    path: 'thankyou',
    canActivate: [AuthGuardService],
    component: ThankyouComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
