import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeTestButtonComponent } from './cole-test-button.component';

describe('ColeTestButtonComponent', () => {
  let component: ColeTestButtonComponent;
  let fixture: ComponentFixture<ColeTestButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColeTestButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColeTestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
