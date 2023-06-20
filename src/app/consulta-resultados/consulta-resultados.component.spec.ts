import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaResultadosComponent } from './consulta-resultados.component';

describe('ConsultaResultadosComponent', () => {
  let component: ConsultaResultadosComponent;
  let fixture: ComponentFixture<ConsultaResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
