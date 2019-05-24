import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsReceivedComponent } from './gifts-received.component';

describe('GiftsReceivedComponent', () => {
  let component: GiftsReceivedComponent;
  let fixture: ComponentFixture<GiftsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
