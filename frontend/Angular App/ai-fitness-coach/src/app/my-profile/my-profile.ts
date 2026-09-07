import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Sex = 'male' | 'female' | 'other';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'athlete';
type Goal = 'lose' | 'maintain' | 'gain';

interface Profile {
  age: number;
  height: number;
  weight: number;
  sex: Sex;
  activity: ActivityLevel;
  goal: Goal;
}

interface NutritionTargets {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

@Component({
  selector: 'app-my-profile',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
})
export class MyProfile {
  protected readonly profile = signal<Profile>({
    age: 30,
    height: 170,
    weight: 70,
    sex: 'male',
    activity: 'moderate',
    goal: 'maintain',
  });
  protected readonly hasSavedProfile = signal(false);
  protected readonly targets = computed(() => this.calculateTargets(this.profile()));

  constructor() {
    const savedProfile = localStorage.getItem('ai-fitness-profile');
    if (savedProfile) {
      try {
        this.profile.set(JSON.parse(savedProfile) as Profile);
        this.hasSavedProfile.set(true);
      } catch {
        localStorage.removeItem('ai-fitness-profile');
      }
    }
  }

  protected saveProfile(): void {
    localStorage.setItem('ai-fitness-profile', JSON.stringify(this.profile()));
    this.hasSavedProfile.set(true);
  }

  protected editProfile(): void {
    this.hasSavedProfile.set(false);
  }

  protected calculateTargets(profile: Profile): NutritionTargets {
    const sexAdjustment = profile.sex === 'male' ? 5 : profile.sex === 'female' ? -161 : -78;
    const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + sexAdjustment;
    const activityFactors: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725,
      athlete: 1.9,
    };
    const goalFactors: Record<Goal, number> = { lose: 0.8, maintain: 1, gain: 1.1 };
    const tdee = bmr * activityFactors[profile.activity];
    const calories = Math.round(tdee * goalFactors[profile.goal]);
    const protein = Math.round(profile.weight * 2);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories,
      protein,
      carbs,
      fat,
    };
  }
}
