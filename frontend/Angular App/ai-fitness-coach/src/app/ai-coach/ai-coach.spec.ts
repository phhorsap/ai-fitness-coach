import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCoach } from './ai-coach';

describe('AiCoach', () => {
  let component: AiCoach;
  let fixture: ComponentFixture<AiCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCoach],
    }).compileComponents();

    fixture = TestBed.createComponent(AiCoach);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show approximate food estimates and recommendations', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Estimated Calories');
    expect(compiled.textContent).toContain('ประมาณ');
    expect(compiled.textContent).toContain('AI Recommendation');
    expect(compiled.textContent).toContain('Protein วันนี้ยังต่ำกว่าที่แนะนำ');
  });
});
