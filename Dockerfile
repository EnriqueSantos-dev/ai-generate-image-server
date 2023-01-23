FROM node:alpine

RUN apk update && apk upgrade -q --no-cache

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

COPY . .

EXPOSE 3333

ENV NODE_ENV=production

CMD [ "pnpm", "dev" ]
