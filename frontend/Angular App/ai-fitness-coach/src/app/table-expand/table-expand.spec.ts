import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExpand } from './table-expand';

describe('TableExpand', () => {
  let component: TableExpand;
  let fixture: ComponentFixture<TableExpand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableExpand],
    }).compileComponents();

    fixture = TestBed.createComponent(TableExpand);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
