import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerguntasComponent } from './form-perguntas.component';

describe('FormPerguntasComponent', () => {
  let component: FormPerguntasComponent;
  let fixture: ComponentFixture<FormPerguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPerguntasComponent]
    });
    fixture = TestBed.createComponent(FormPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
