import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegistroUsuarioDTO } from '../../../core/models/auth.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    template: `
    <div class="min-h-screen bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          Crea tu cuenta
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-400">
          O
          <a routerLink="/login" class="font-medium text-blue-500 hover:text-blue-400 transition-colors">
            inicia sesión si ya tienes una
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-neutral-900 overflow-hidden py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-neutral-800 backdrop-blur-sm">
          <form class="space-y-6" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            
            @if (auth.error()) {
              <div class="rounded-lg bg-red-900/50 border border-red-500/50 p-4">
                <div class="flex">
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-200">{{ auth.error() }}</h3>
                  </div>
                </div>
              </div>
            }

            <div>
              <label for="usuario" class="block text-sm font-medium text-neutral-300">
                Usuario
              </label>
              <div class="mt-2">
                <input
                  id="usuario"
                  formControlName="usuario"
                  type="text"
                  required
                  class="appearance-none block w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tu nombre de usuario"
                />
              </div>
            </div>
            
            <div>
              <label for="correo" class="block text-sm font-medium text-neutral-300">
                Correo Electrónico
              </label>
              <div class="mt-2">
                <input
                  id="correo"
                  formControlName="correo"
                  type="email"
                  required
                  class="appearance-none block w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-neutral-300">
                Contraseña
              </label>
              <div class="mt-2">
                <input
                  id="password"
                  formControlName="password"
                  type="password"
                  required
                  class="appearance-none block w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="registerForm.invalid || auth.loading()"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                @if (auth.loading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando cuenta...
                } @else {
                  Registrarse
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export default class RegisterComponent {
    auth = inject(AuthService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    registerForm = this.fb.group({
        usuario: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });

    async onSubmit() {
        if (this.registerForm.valid) {
            try {
                await this.auth.register(this.registerForm.value as RegistroUsuarioDTO);
                // After successful registration, we redirect to login to sign in
                this.router.navigate(['/login']);
            } catch (error) {
                // Error is handled in signal
            }
        }
    }
}
