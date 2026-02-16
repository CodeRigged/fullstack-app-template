FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY ../shared ./shared
COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --filter ./backend

RUN pnpm --filter ./backend build

EXPOSE 5000

CMD ["pnpm", "--filter", "./backend", "start"]