import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaqueteDTO } from '../models/paquete.model';
import { catchError } from 'rxjs/operators';
import { of, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaqueteService {
    private readonly baseUrl = `${environment.apiUrl}/paquetes`;
    private http = inject(HttpClient);

    // Private writable signals
    private _paquetes = signal<PaqueteDTO[]>([]);
    private _loading = signal(false);
    private _error = signal<string | null>(null);

    // Public readonly signals
    readonly paquetes = this._paquetes.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    /**
     * Carga el listado de paquetes desde el backend
     */
    async loadPaquetes(): Promise<void> {
        this._loading.set(true);
        this._error.set(null);
        try {
            const paquetes = await firstValueFrom(
                this.http.get<PaqueteDTO[]>(this.baseUrl)
            );
            this._paquetes.set(paquetes || []);
        } catch (e) {
            this._error.set('No se pudieron cargar los paquetes. Inténtalo de nuevo más tarde.');
            console.error('Error cargando paquetes:', e);
            this._paquetes.set([]);
        } finally {
            this._loading.set(false);
        }
    }
}
