import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowBugsModule } from './modules/user-story-1/show-bugs/show-bugs.module';
import { FormBugModule } from './modules/user-story-2/form-bug/form-bug.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { NavigationModule } from './modules/navigation/navigation.module';

// Angural Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: false}),
    BrowserModule,
    AppRoutingModule,
    ShowBugsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormBugModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
