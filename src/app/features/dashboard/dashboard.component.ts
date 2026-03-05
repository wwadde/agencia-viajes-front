import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <div class="min-h-screen bg-neutral-950 text-neutral-100">
      <nav class="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span class="text-blue-500 font-bold text-lg">A</span>
              </div>
              <span class="font-bold text-xl tracking-tight text-white">Agencia App</span>
            </div>
            
            <div class="flex items-center gap-4">
              <span class="text-sm text-neutral-400">
                Auntenticado como: <strong class="text-neutral-200">{{ auth.user()?.usuario }}</strong>
              </span>
              <span class="px-2.5 py-1 text-xs font-semibold bg-neutral-800 text-blue-400 rounded-full border border-neutral-700">
                {{ auth.roles() }}
              </span>
              <button 
                (click)="onLogout()"
                [disabled]="auth.loading()"
                class="ml-4 px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <h1 class="text-3xl font-extrabold text-white mb-6">
            ¡Hola, {{ auth.user()?.usuario }}!
          </h1>
          <p class="text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Has accedido exitosamente al panel de control protegido. Esta página demuestra el uso del AuthGuard y la inyección de Signals en Angular v20+.
          </p>
          
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 break-words hover:border-neutral-700 transition-colors">
              <h3 class="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">Información del Perfil</h3>
              <p><span class="text-neutral-500">ID:</span> <span class="text-white">{{ auth.user()?.id }}</span></p>
              <p><span class="text-neutral-500">Correo:</span> <span class="text-white">{{ auth.user()?.correo }}</span></p>
              <p><span class="text-neutral-500">Rol:</span> <span class="text-white">{{ auth.roles() }}</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export default class DashboardComponent {
    auth = inject(AuthService);
    private router = inject(Router);

    async onLogout() {
        await this.auth.logout();
        this.router.navigate(['/']);
    }
}
