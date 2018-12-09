import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymemesComponent } from './mymemes.component';

describe('MymemesComponent', () => {
  let component: MymemesComponent;
  let fixture: ComponentFixture<MymemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
