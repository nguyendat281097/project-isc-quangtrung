import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderTypeComponent } from './reader-type.component';

describe('ReaderTypeComponent', () => {
  let component: ReaderTypeComponent;
  let fixture: ComponentFixture<ReaderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
