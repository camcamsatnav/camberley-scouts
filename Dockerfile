# Use an official Node image for the build stage
FROM node:22 AS builder

# Set working directory
WORKDIR /build

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.25-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD [ "wget", "-q", "-O", "/dev/null", "http://127.0.0.1:80/" ] || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
