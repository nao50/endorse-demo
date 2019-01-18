import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTopComponent } from './token-top.component';

describe('TokenTopComponent', () => {
  let component: TokenTopComponent;
  let fixture: ComponentFixture<TokenTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
