import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateauthorizationComponent } from './updateauthorization.component';

describe('UpdateauthorizationComponent', () => {
  let component: UpdateauthorizationComponent;
  let fixture: ComponentFixture<UpdateauthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateauthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateauthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
