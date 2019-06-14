import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBugsComponent } from './show-bugs.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ShowBugsModule } from '../show-bugs.module';
import { ShowBugsService } from '../show-bugs.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShowBugsComponent', () => {
  let component: ShowBugsComponent;
  let fixture: ComponentFixture<ShowBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ FormsModule, RouterTestingModule.withRoutes(
        [ {path: 'bug', component: ShowBugsComponent} ]
        ),
        HttpClientModule,
        ShowBugsModule,
        BrowserAnimationsModule
      ],
      providers: [ShowBugsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
