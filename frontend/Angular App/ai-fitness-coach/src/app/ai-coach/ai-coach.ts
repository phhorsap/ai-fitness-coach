import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FoodItem {
  name: string;
  emoji: string;
  calories: number;
}

interface MealEntry {
  name: string;
  calories: number;
  emoji: string;
}

@Component({
  selector: 'app-ai-coach',
  imports: [FormsModule],
  templateUrl: './ai-coach.html',
  styleUrl: './ai-coach.scss',
})
export class AiCoach {
  protected readonly goalCalories = 1650;
  protected readonly mealText = signal('วันนี้กินข้าวมันไก่ 1 จาน ไข่ต้ม 2 ฟอง และกาแฟเย็น 1 แก้ว');
  protected readonly defaultFoods: FoodItem[] = [
    { name: 'Chicken rice', emoji: '🍚', calories: 650 },
    { name: 'Eggs', emoji: '🥚', calories: 140 },
    { name: 'Iced coffee', emoji: '☕', calories: 180 },
  ];

  protected readonly foodName = signal('');
  protected readonly foodCalories = signal<number | null>(null);
  protected readonly calorieBreakdown = signal<FoodItem[]>(this.defaultFoods);

  protected readonly totalCalories = computed(() =>
    this.calorieBreakdown().reduce((sum, food) => sum + food.calories, 0),
  );

  protected readonly remainingCalories = computed(() =>
    Math.max(this.goalCalories - this.totalCalories(), 0),
  );

  protected readonly recommendation = computed(() => {
    if (this.totalCalories() < 1200) {
      return {
        summary: 'Protein วันนี้ยังต่ำกว่าที่แนะนำ',
        dinner: ['🍗 Grilled chicken', '🥦 Vegetables', '🍚 Small portion of rice'],
      };
    }

    return {
      summary: 'วันนี้อยู่ในสัดส่วนที่พอเหมาะ แต่ควรคุมแคลอรีต่อเนื่อง',
      dinner: ['🥗 Salad chicken bowl', '🍠 Roasted potatoes', '🐟 Fish or tofu'],
    };
  });

  protected addFood(): void {
    const name = this.foodName().trim();
    const calories = this.foodCalories();

    if (!name || calories === null || calories <= 0) {
      return;
    }

    const emoji = this.getEmojiForFood(name);
    this.calorieBreakdown.update((foods) => [...foods, { name, emoji, calories }]);
    this.mealText.set(`${this.mealText()} ${name} (${calories} kcal)`);
    this.foodName.set('');
    this.foodCalories.set(null);
  }

  protected removeFood(index: number): void {
    this.calorieBreakdown.update((foods) => foods.filter((_, i) => i !== index));
  }

  private getEmojiForFood(name: string): string {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('chicken')) return '🍗';
    if (lowerName.includes('egg')) return '🥚';
    if (lowerName.includes('rice')) return '🍚';
    if (lowerName.includes('coffee')) return '☕';
    if (lowerName.includes('salad')) return '🥗';
    if (lowerName.includes('fish')) return '🐟';
    if (lowerName.includes('tofu')) return '🧊';
    if (lowerName.includes('fruit')) return '🍉';
    if (lowerName.includes('milk')) return '🥛';

    return '🍽️';
  }
}
