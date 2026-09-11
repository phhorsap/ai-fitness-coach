import { Routes } from '@angular/router';
import { AiCoach } from './ai-coach/ai-coach';
import { Dashboard } from './dashboard/dashboard';
import { MyProfile } from './my-profile/my-profile';
import { TableExpand } from './table-expand/table-expand';
import { Workout } from './workout/workout';
import { AiPlan } from './ai-plan/ai-plan';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'ai-coach', component: AiCoach },
  { path: 'my-profile', component: MyProfile },
  { path: 'table', component: TableExpand },
  { path: 'workout', component: Workout },
  { path: 'plan', component: AiPlan },
];
