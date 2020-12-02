import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirTarefaComponent } from './atribuir-tarefa.component';

describe('AtribuirTarefaComponent', () => {
  let component: AtribuirTarefaComponent;
  let fixture: ComponentFixture<AtribuirTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtribuirTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
