import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {OrderListModule} from 'primeng/orderlist';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentService } from './student.service';
import { MessageService } from 'primeng/api';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { FeeComponent } from './fee/fee.component';
import { LoginComponent } from './login/login.component';
import { PendingFeeComponent } from './pending-fee/pending-fee.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditStudentComponent,
    ThankyouComponent,
    FeeComponent,
    LoginComponent,
    PendingFeeComponent,
    ReportCardComponent,
    ChangePasswordComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    CheckboxModule,
    PasswordModule,
//    OrderListModule,
    TableModule,
    CalendarModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [StudentService, MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
