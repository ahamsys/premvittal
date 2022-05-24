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
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentService } from './student.service';
import { MessageService } from 'primeng/api';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { FeeComponent } from './fee/fee.component';
import { LoginComponent } from './login/login.component';
import { PendingFeeComponent } from './pending-fee/pending-fee.component';
import { ReportCardComponent } from './report-card/report-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditStudentComponent,
    ThankyouComponent,
    FeeComponent,
    LoginComponent,
    PendingFeeComponent,
    ReportCardComponent
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
//    OrderListModule,
    TableModule,
    CalendarModule,
    ToastModule
  ],
  providers: [StudentService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
