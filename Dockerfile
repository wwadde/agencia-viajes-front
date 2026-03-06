FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.1.4 --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS runtime

LABEL org.opencontainers.image.title="agencia-frontend"
LABEL org.opencontainers.image.description="Angular SPA – Agencia de viajes"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/agencia-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]