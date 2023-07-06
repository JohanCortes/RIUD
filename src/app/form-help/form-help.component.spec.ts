import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHelpComponent } from './form-help.component';

describe('FormHelpComponent', () => {
  let component: FormHelpComponent;
  let fixture: ComponentFixture<FormHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
