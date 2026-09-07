import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyProfile } from './my-profile/my-profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyProfile],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-fitness-coach');
}
