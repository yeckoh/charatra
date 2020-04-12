import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpellComponent } from './dialog-spell.component';

describe('DialogSpellComponent', () => {
  let component: DialogSpellComponent;
  let fixture: ComponentFixture<DialogSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
