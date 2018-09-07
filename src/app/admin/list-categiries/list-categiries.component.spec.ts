import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategiriesComponent } from './list-categiries.component';

describe('ListCategiriesComponent', () => {
  let component: ListCategiriesComponent;
  let fixture: ComponentFixture<ListCategiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
