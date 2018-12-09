import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemeComponent } from './addmeme.component';

describe('AddmemeComponent', () => {
  let component: AddmemeComponent;
  let fixture: ComponentFixture<AddmemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
