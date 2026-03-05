import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { PaqueteService } from '../../core/services/paquete.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, CurrencyPipe],
    template: `
    <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <!-- Navbar -->
      <nav class="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span class="text-blue-500 font-bold text-lg leading-none">A</span>
              </div>
              <span class="font-bold text-xl tracking-tight text-white hidden sm:block">Agencia Viajes</span>
            </div>
            
            <div class="flex items-center gap-4">
              @if (auth.isAuthenticated()) {
                <span class="text-sm text-neutral-400 hidden sm:block">
                  Hola, <strong class="text-neutral-200">{{ auth.user()?.usuario }}</strong>
                </span>
                <a routerLink="/dashboard" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors border border-transparent">
                  Mi Panel
                </a>
              } @else {
                <a routerLink="/login" class="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                  Iniciar sesión
                </a>
                <a routerLink="/register" class="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20">
                  Registrarse
                </a>
              }
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative overflow-hidden py-24 sm:py-32 bg-neutral-900 border-b border-neutral-800">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-balance flex flex-col items-center">
          <span class="px-3 py-1 mb-6 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
            Encuentra tu próximo destino
          </span>
          <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Explora el mundo <br class="hidden sm:block" /> con nuestra agencia
          </h1>
          <p class="text-lg sm:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Descubre paquetes turísticos increíbles diseñados para ofrecerte las mejores experiencias, sin importar si viajas solo, en pareja o con familia.
          </p>
          <a href="#paquetes" class="px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
            Ver Paquetes Disponibles
          </a>
        </div>
      </header>

      <!-- Main Content: Paquetes -->
      <main id="paquetes" class="flex-grow max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">Paquetes Populares</h2>
        </div>

        @if (paqueteService.loading()) {
          <!-- Loading Skeletons -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (i of [1,2,3]; track i) {
              <div class="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden animate-pulse">
                <div class="h-48 bg-neutral-800 w-full"></div>
                <div class="p-6">
                  <div class="h-5 bg-neutral-800 rounded-md w-3/4 mb-4"></div>
                  <div class="h-4 bg-neutral-800 rounded-md w-full mb-2"></div>
                  <div class="h-4 bg-neutral-800 rounded-md w-2/3 mb-6"></div>
                  <div class="flex justify-between items-center">
                    <div class="h-6 bg-neutral-800 rounded-md w-1/3"></div>
                    <div class="h-8 bg-neutral-800 rounded-md w-1/4"></div>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else if (paqueteService.error()) {
          <!-- Error State -->
          <div class="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center">
            <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 class="text-lg font-medium text-white mb-2">Error de conexión</h3>
            <p class="text-neutral-400">{{ paqueteService.error() }}</p>
            <button (click)="paqueteService.loadPaquetes()" class="mt-6 px-4 py-2 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700">
              Reintentar
            </button>
          </div>
        } @else if (paqueteService.paquetes().length === 0) {
          <!-- Empty State -->
          <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
            No hay paquetes disponibles en este momento.
          </div>
        } @else {
          <!-- Paquetes Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (paquete of paqueteService.paquetes(); track paquete.id) {
              <div class="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col">
                <div class="relative h-56 overflow-hidden bg-neutral-800">
                  @if (paquete.imagenUrl) {
                    <img [src]="paquete.imagenUrl" [alt]="paquete.nombre" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  } @else {
                    <div class="w-full h-full flex items-center justify-center text-neutral-600">
                      <svg class="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  }
                  <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                      {{ paquete.duracionDias }} días
                    </span>
                  </div>
                </div>
                
                <div class="p-6 flex-grow flex flex-col">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-xl font-bold text-white leading-tight">{{ paquete.nombre }}</h3>
                  </div>
                  <div class="flex items-center text-neutral-400 text-sm mb-4">
                    <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ paquete.destino }}
                  </div>
                  
                  <p class="text-neutral-400 text-sm line-clamp-2 mb-6 flex-grow">
                    {{ paquete.descripcion }}
                  </p>
                  
                  <div class="mt-auto pt-5 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <p class="text-xs text-neutral-500 mb-0.5">Precio por persona</p>
                      <p class="text-2xl font-bold text-white">{{ paquete.precio | currency:'USD' }}</p>
                    </div>
                    <button class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-xl transition-colors">
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </main>

      <!-- Footer -->
      <footer class="border-t border-neutral-800 bg-neutral-900 py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500 text-sm">
          <p>&copy; 2026 Agencia Viajes. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  `
})
export default class HomeComponent implements OnInit {
    auth = inject(AuthService);
    paqueteService = inject(PaqueteService);

    ngOnInit() {
        this.paqueteService.loadPaquetes();
    }
}
