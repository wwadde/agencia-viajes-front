import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserInfoDTO, LoginDTO, RegistroUsuarioDTO } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = `${environment.apiUrl}/auth`;
    private http = inject(HttpClient);

    // Private writable state
    private _user = signal<UserInfoDTO | null>(null);
    private _loading = signal(false);
    private _error = signal<string | null>(null);

    // Public read-only signals
    readonly user = this._user.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    // Derived state (computed)
    readonly isAuthenticated = computed(() => this._user() !== null);
    readonly roles = computed(() => this._user()?.rol);

    /**
     * Obtiene la información del usuario actual si existe una sesión activa
     */
    async checkAuth(): Promise<void> {
        this._loading.set(true);
        this._error.set(null);
        try {
            const user = await firstValueFrom(
                this.http.get<UserInfoDTO>(`${this.baseUrl}/me`)
            );
            this._user.set(user);
        } catch (e) {
            this._user.set(null); // No autenticado
        } finally {
            this._loading.set(false);
        }
    }

    /**
     * Inicia sesión con las credenciales dadas
     */
    async login(credentials: LoginDTO): Promise<void> {
        this._loading.set(true);
        this._error.set(null);
        try {
            const user = await firstValueFrom(
                this.http.post<UserInfoDTO>(`${this.baseUrl}/login`, credentials)
            );
            this._user.set(user);
        } catch (e) {
            if (e instanceof HttpErrorResponse && e.status === 401) {
                this._error.set('Credenciales inválidas');
            } else {
                this._error.set('Error de conexión o servidor');
            }
            throw e;
        } finally {
            this._loading.set(false);
        }
    }

    /**
     * Registra un nuevo usuario
     */
    async register(data: RegistroUsuarioDTO): Promise<void> {
        this._loading.set(true);
        this._error.set(null);
        try {
            await firstValueFrom(
                this.http.post(`${this.baseUrl}/register`, data)
            );
        } catch (e) {
            if (e instanceof HttpErrorResponse) {
                if (e.status === 409) {
                    this._error.set('El nombre de usuario o correo ya existe');
                } else if (e.status === 400) {
                    this._error.set('Datos de entrada inválidos');
                } else {
                    this._error.set('Error en el registro');
                }
            }
            throw e;
        } finally {
            this._loading.set(false);
        }
    }

    /**
     * Cierra sesión
     */
    async logout(): Promise<void> {
        this._loading.set(true);
        try {
            await firstValueFrom(this.http.post(`${this.baseUrl}/logout`, {}));
        } catch (e) {
            console.error('Error al cerrar sesión', e);
        } finally {
            this._user.set(null);
            this._error.set(null);
            this._loading.set(false);
        }
    }

    /**
     * Limpia el mensaje de error de forma manual
     */
    clearError(): void {
        this._error.set(null);
    }
}
