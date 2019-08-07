import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShowDataPipePipe } from './pipe/show-data-pipe.pipe';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TestModalComponent } from './test-modal/test-modal.component';
import { RegisterFormComponent } from './component/register-form/register-form.component';

const appRoutes: Routes = [
  { path: '',         component:  LoginFormComponent},
  { path: 'home',       component: HomePageComponent },
  { path: 'modal',       component: TestModalComponent },
  { path: '**',       component: LoginFormComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    ShowDataPipePipe,
    SearchFilterPipe,
    TestModalComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    [ RouterModule.forRoot(appRoutes) ],
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
