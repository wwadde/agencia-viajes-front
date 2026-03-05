import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    @if (auth.loading() && !isLoaded()) {
      <div class="min-h-screen bg-neutral-950 flex items-center justify-center">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `
})
export class App implements OnInit {
  auth = inject(AuthService);
  isLoaded = signal(false);

  async ngOnInit(): Promise<void> {
    await this.auth.checkAuth();
    this.isLoaded.set(true);
  }
}
