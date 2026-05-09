FROM node:25.5.0 AS dependencies

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /build

RUN npm install --global pnpm@10.32.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder

COPY . .
RUN pnpm build

FROM node:25.5.0-alpine AS runner

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PORT=3000
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /app

RUN npm install --global pnpm@10.32.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile && pnpm store prune

COPY --from=builder --chown=node:node /build/.output ./.output

USER node

EXPOSE 3000

CMD ["pnpm", "start"]
