FROM node:25.5.0 AS builder

WORKDIR /build

COPY package.json package-lock.json* ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:25.5.0-alpine

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/package-lock.json* ./package-lock.json

RUN npm ci --omit=dev

RUN apk add --no-cache curl

RUN chown -R node:node /app

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 CMD ["sh","-c","curl -fsS --max-time 5 http://127.0.0.1:3000/api/v1/health || exit 1"]

ENTRYPOINT ["node", "dist/bundle.js"]
