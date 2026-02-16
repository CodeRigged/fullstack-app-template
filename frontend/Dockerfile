FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY ../shared ./shared
COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --filter ./frontend

RUN pnpm --filter ./frontend build

EXPOSE 8080

CMD ["pnpm", "--filter", "./frontend", "preview"]