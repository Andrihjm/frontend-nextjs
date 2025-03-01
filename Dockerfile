FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/.next ./.next
COPY --from=development /usr/src/app/public ./public
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]