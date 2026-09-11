import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPlan } from './ai-plan';

describe('AiPlan', () => {
  let component: AiPlan;
  let fixture: ComponentFixture<AiPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(AiPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a weekly menu and shopping list', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('เมนูอาหารสัปดาห์');
    expect(text).toContain('รายการซื้อ');
  });
});
