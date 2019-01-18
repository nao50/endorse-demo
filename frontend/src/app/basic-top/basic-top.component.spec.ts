import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTopComponent } from './basic-top.component';

describe('BasicTopComponent', () => {
  let component: BasicTopComponent;
  let fixture: ComponentFixture<BasicTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
