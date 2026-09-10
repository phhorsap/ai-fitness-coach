import { Component } from '@angular/core';

interface WorkoutExercise {
  name: string;
  detail: string;
  minutes: number;
  calories: number;
  type: 'Warm-up' | 'Strength' | 'Cardio' | 'Cooldown';
}

type FocusArea = 'waist' | 'lower' | 'upper' | 'full';

interface WorkoutProgram {
  label: string;
  targetLoss: string;
  sessionLength: number;
  estimatedBurn: number;
  plan: WorkoutExercise[];
}

interface SavedWorkoutRecord {
  focus: FocusArea;
  label: string;
  completedAt: string;
  calories: number;
  minutes: number;
}

@Component({
  selector: 'app-workout',
  imports: [],
  templateUrl: './workout.html',
  styleUrl: './workout.scss',
})
export class Workout {
  selectedFocus: FocusArea = 'waist';
  completed = false;
  savedMessage = '';

  readonly focusOptions: { value: FocusArea; label: string }[] = [
    { value: 'waist', label: 'เอว' },
    { value: 'lower', label: 'ส่วนล่าง' },
    { value: 'upper', label: 'ส่วนบน' },
    { value: 'full', label: 'ทั้งตัว' },
  ];

  readonly programs: Record<FocusArea, WorkoutProgram> = {
    waist: {
      label: 'เอว',
      targetLoss: '0.5–1.0 kg / week',
      sessionLength: 35,
      estimatedBurn: 330,
      plan: [
        { name: 'March in place / brisk walk', detail: 'Warm body and raise heart rate', minutes: 5, calories: 25, type: 'Warm-up' },
        { name: 'Russian twists', detail: '3 rounds x 20 reps', minutes: 6, calories: 55, type: 'Strength' },
        { name: 'Mountain climbers', detail: '3 rounds x 30 sec', minutes: 6, calories: 70, type: 'Cardio' },
        { name: 'Dead bug', detail: '3 rounds x 12 reps', minutes: 6, calories: 50, type: 'Strength' },
        { name: 'Bicycle crunch', detail: '3 rounds x 16 reps', minutes: 7, calories: 80, type: 'Strength' },
        { name: 'Stretch + breathing', detail: 'Release tight waist and hips', minutes: 5, calories: 20, type: 'Cooldown' },
      ],
    },
    lower: {
      label: 'ส่วนล่าง',
      targetLoss: '0.5–1.0 kg / week',
      sessionLength: 40,
      estimatedBurn: 390,
      plan: [
        { name: 'Brisk walk or jump rope', detail: 'Warm body and raise heart rate', minutes: 5, calories: 30, type: 'Warm-up' },
        { name: 'Bodyweight squats', detail: '4 rounds x 15 reps', minutes: 8, calories: 85, type: 'Strength' },
        { name: 'Lunges', detail: '4 rounds x 12 reps each leg', minutes: 8, calories: 90, type: 'Strength' },
        { name: 'Glute bridges', detail: '3 rounds x 15 reps', minutes: 6, calories: 55, type: 'Strength' },
        { name: 'Fast march / cycling', detail: 'Moderate cardio burst', minutes: 10, calories: 110, type: 'Cardio' },
        { name: 'Leg stretch', detail: 'Cooldown and recovery', minutes: 3, calories: 15, type: 'Cooldown' },
      ],
    },
    upper: {
      label: 'ส่วนบน',
      targetLoss: '0.5–1.0 kg / week',
      sessionLength: 38,
      estimatedBurn: 360,
      plan: [
        { name: 'Arm circles + brisk walk', detail: 'Warm up shoulders and chest', minutes: 5, calories: 25, type: 'Warm-up' },
        { name: 'Push-ups', detail: '3 rounds x 10–12 reps', minutes: 8, calories: 80, type: 'Strength' },
        { name: 'Incline rows', detail: '3 rounds x 12 reps', minutes: 7, calories: 75, type: 'Strength' },
        { name: 'Shoulder taps', detail: '3 rounds x 20 taps', minutes: 6, calories: 60, type: 'Strength' },
        { name: 'High knees / jumping jacks', detail: 'Cardio focus for full upper-body burn', minutes: 9, calories: 95, type: 'Cardio' },
        { name: 'Chest and arm stretch', detail: 'Recovery and mobility', minutes: 3, calories: 15, type: 'Cooldown' },
      ],
    },
    full: {
      label: 'ทั้งตัว',
      targetLoss: '0.5–1.0 kg / week',
      sessionLength: 42,
      estimatedBurn: 420,
      plan: [
        { name: 'Jump rope / brisk walk', detail: 'Full-body warm up', minutes: 5, calories: 35, type: 'Warm-up' },
        { name: 'Squats', detail: '4 rounds x 15 reps', minutes: 8, calories: 80, type: 'Strength' },
        { name: 'Push-ups', detail: '3 rounds x 10 reps', minutes: 7, calories: 70, type: 'Strength' },
        { name: 'Lunges', detail: '3 rounds x 12 reps each leg', minutes: 7, calories: 75, type: 'Strength' },
        { name: 'Burpees or fast march', detail: 'High-intensity cardio finish', minutes: 12, calories: 130, type: 'Cardio' },
        { name: 'Full-body stretch', detail: 'Reduce soreness and keep mobility', minutes: 3, calories: 20, type: 'Cooldown' },
      ],
    },
  };

  readonly keyTips = [
    'ทำ 4–5 ครั้งต่อสัปดาห์ เพื่อให้มีการเผาผลาญต่อเนื่อง',
    'ควบคุมอาหารให้มีแคลอรีส่วนเกินประมาณ 300–500 kcal ต่อวัน',
    'นอนอย่างน้อย 7–8 ชั่วโมง เพื่อช่วยให้ลดน้ำหนักได้ดีขึ้น',
    'เพิ่มความเร็วหรือเพิ่มชุดให้ช้าๆ เพื่อค่อยปรับระดับความหนัก',
  ];

  readonly weeklyChecklist = [
    { label: 'Workout days', value: '4–5 days' },
    { label: 'Session time', value: '35–42 mins' },
    { label: 'Target', value: '0.5–1.0 kg' },
    { label: 'Recovery', value: '1 day rest' },
  ];

  get activeProgram(): WorkoutProgram {
    return this.programs[this.selectedFocus];
  }

  selectFocus(focus: FocusArea): void {
    this.selectedFocus = focus;
    this.completed = false;
    this.savedMessage = '';
  }

  saveWorkout(): void {
    const record: SavedWorkoutRecord = {
      focus: this.selectedFocus,
      label: this.activeProgram.label,
      completedAt: new Date().toISOString(),
      calories: this.activeProgram.estimatedBurn,
      minutes: this.activeProgram.sessionLength,
    };

    const existing = JSON.parse(localStorage.getItem('ai-fitness-workouts') ?? '[]') as SavedWorkoutRecord[];
    existing.push(record);
    localStorage.setItem('ai-fitness-workouts', JSON.stringify(existing));

    this.completed = true;
    this.savedMessage = `บันทึกสำเร็จ: ${this.activeProgram.label} • ${this.activeProgram.estimatedBurn} kcal • ${new Date(record.completedAt).toLocaleString()}`;
  }
}
