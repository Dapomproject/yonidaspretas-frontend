import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAprovadosComponent } from './usuarios-aprovados.component';

describe('UsuariosAprovadosComponent', () => {
  let component: UsuariosAprovadosComponent;
  let fixture: ComponentFixture<UsuariosAprovadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosAprovadosComponent]
    });
    fixture = TestBed.createComponent(UsuariosAprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
