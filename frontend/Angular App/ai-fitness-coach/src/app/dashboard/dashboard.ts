import { Component } from '@angular/core';

interface SummaryCard {
  label: string;
  value: string;
  change: string;
  tone: 'green' | 'blue' | 'purple' | 'amber';
}

interface SavedWorkoutRecord {
  focus: string;
  label: string;
  completedAt: string;
  calories: number;
  minutes: number;
}

interface DailyNutritionEntry {
  day: string;
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly summaryCards: SummaryCard[];
  readonly monthlyData = [62, 58, 70, 65, 78, 74, 82, 79, 88, 84, 90, 86];
  readonly weeklyData = [78, 82, 80, 86, 90, 88, 94];
  readonly dailyNutrition: DailyNutritionEntry[];

  readonly focusAreas = [
    { name: 'Protein intake', value: '82%', target: 'Target 90%' },
    { name: 'Hydration', value: '74%', target: 'Target 80%' },
    { name: 'Sleep quality', value: '88%', target: 'Target 85%' },
  ];

  constructor() {
    const workouts = this.getSavedWorkouts();
    const totalCalories = workouts.reduce((sum, item) => sum + item.calories, 0);
    const totalMinutes = workouts.reduce((sum, item) => sum + item.minutes, 0);
    const sessions = workouts.length;

    this.summaryCards = [
      { label: 'Workout calories burned', value: `${totalCalories.toLocaleString()} kcal`, change: sessions > 0 ? `+${sessions} sessions` : 'No data', tone: 'green' },
      { label: 'Average burn / session', value: `${Math.max(0, Math.round(totalCalories / Math.max(1, sessions || 1))).toLocaleString()} kcal`, change: `${Math.max(0, Math.round(totalMinutes / Math.max(1, sessions || 1)))} min/session`, tone: 'blue' },
      { label: 'Weight', value: '68.4 kg', change: '-1.2 kg', tone: 'purple' },
      { label: 'Workouts', value: `${sessions} session${sessions === 1 ? '' : 's'}`, change: sessions > 0 ? 'Updated today' : 'No workouts yet', tone: 'amber' },
    ];

    this.dailyNutrition = this.buildDailyNutrition();
  }

  private buildDailyNutrition(): DailyNutritionEntry[] {
    const fallback: DailyNutritionEntry[] = [
      { day: 'Mon', date: '2026-09-07', breakfast: 420, lunch: 560, dinner: 680, snack: 180, total: 1840 },
      { day: 'Tue', date: '2026-09-08', breakfast: 390, lunch: 610, dinner: 530, snack: 140, total: 1670 },
      { day: 'Wed', date: '2026-09-09', breakfast: 460, lunch: 590, dinner: 720, snack: 200, total: 1970 },
      { day: 'Thu', date: '2026-09-10', breakfast: 430, lunch: 540, dinner: 650, snack: 160, total: 1780 },
      { day: 'Fri', date: '2026-09-11', breakfast: 410, lunch: 570, dinner: 610, snack: 120, total: 1710 },
    ];

    const saved = this.getSavedMealEntries();
    if (saved.length === 0) {
      return fallback;
    }

    const grouped = new Map<string, DailyNutritionEntry>();

    for (const entry of saved) {
      const rawDate = entry.date || new Date().toISOString();
      const date = new Date(rawDate).toISOString().slice(0, 10);
      const day = new Date(rawDate).toLocaleDateString('en-US', { weekday: 'short' });
      const current = grouped.get(date) ?? {
        day,
        date,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
        total: 0,
      };

      if (entry.mealType === 'breakfast') current.breakfast += entry.calories;
      if (entry.mealType === 'lunch') current.lunch += entry.calories;
      if (entry.mealType === 'dinner') current.dinner += entry.calories;
      if (entry.mealType === 'snack') current.snack += entry.calories;

      current.total = current.breakfast + current.lunch + current.dinner + current.snack;
      grouped.set(date, current);
    }

    return Array.from(grouped.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  private getSavedMeals(): { date: string; mealType: string; calories: number }[] {
    try {
      const value = localStorage.getItem('ai-fitness-meal-log');
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  }

  private getSavedMealEntries(): { date: string; mealType: string; calories: number }[] {
    return this.getSavedMeals();
  }

  private getSavedWorkouts(): SavedWorkoutRecord[] {
    try {
      const value = localStorage.getItem('ai-fitness-workouts');
      return value ? (JSON.parse(value) as SavedWorkoutRecord[]) : [];
    } catch {
      return [];
    }
  }
}
