import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSelectorComponent } from './doctor-selector.component';

describe('DoctorSelectorComponent', () => {
  let component: DoctorSelectorComponent;
  let fixture: ComponentFixture<DoctorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
