import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Configures all outgoing requests to include credentials (cookies)
    // This is required to send the SESSION cookie back to the server
    const modifiedReq = req.clone({
        withCredentials: true,
    });

    return next(modifiedReq);
};
