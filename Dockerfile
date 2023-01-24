FROM node:alpine AS dev

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine AS production

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3333

CMD [ "pnpm", "start" ]
