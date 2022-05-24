import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { FeeComponent } from './fee/fee.component';
import { LoginComponent } from './login/login.component';
import { PendingFeeComponent } from './pending-fee/pending-fee.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'editstudent',
    component: EditStudentComponent
  },
  {
    path: 'fee',
    component: FeeComponent
  },
  {
    path: 'pendingfee',
    component: PendingFeeComponent
  },
  {
    path: 'reportcard',
    component: ReportCardComponent
  },
  {
    path: 'thankyou',
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
