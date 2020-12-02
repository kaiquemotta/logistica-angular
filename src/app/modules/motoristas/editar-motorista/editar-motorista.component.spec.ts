import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMotoristaComponent } from './editar-motorista.component';

describe('EditarMotoristaComponent', () => {
  let component: EditarMotoristaComponent;
  let fixture: ComponentFixture<EditarMotoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMotoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
