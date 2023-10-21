import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosReprovadosComponent } from './usuarios-reprovados.component';

describe('UsuariosReprovadosComponent', () => {
  let component: UsuariosReprovadosComponent;
  let fixture: ComponentFixture<UsuariosReprovadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosReprovadosComponent]
    });
    fixture = TestBed.createComponent(UsuariosReprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
