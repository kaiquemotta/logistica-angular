import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularComponent } from './vincular.component';

describe('VincularComponent', () => {
  let component: VincularComponent;
  let fixture: ComponentFixture<VincularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
