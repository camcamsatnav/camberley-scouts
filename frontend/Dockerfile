FROM node:25.5.0 AS builder

WORKDIR /build

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.29.4-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["sh", "-c", "wget -q -O /dev/null http://127.0.0.1:80/ || exit 1"]

CMD ["nginx", "-g", "daemon off;"]
