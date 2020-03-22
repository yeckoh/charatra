import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonaComponent } from './dialog-persona.component';

describe('DialogPersonaComponent', () => {
  let component: DialogPersonaComponent;
  let fixture: ComponentFixture<DialogPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
