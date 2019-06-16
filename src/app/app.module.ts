import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowBugsModule } from './modules/user-story-1/show-bugs/show-bugs.module';
import { FormBugModule } from './modules/user-story-2/form-bug/form-bug.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { NavigationModule } from './modules/navigation/navigation.module';
import { ToastrModule } from 'ngx-toastr';
// Angural Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Ng Bootstrap
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AuthorizationInterceptor } from './Interceptors/authorization-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
// tslint:disable-next-line: deprecation
    // NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    RouterModule.forRoot(routes, {useHash: false}),
    BrowserModule,
    AppRoutingModule,
    ShowBugsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormBugModule,
    NavigationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
