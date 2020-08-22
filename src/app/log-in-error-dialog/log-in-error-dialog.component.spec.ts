import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInErrorDialogComponent } from './log-in-error-dialog.component';

describe('LogInErrorDialogComponent', () => {
  let component: LogInErrorDialogComponent;
  let fixture: ComponentFixture<LogInErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
