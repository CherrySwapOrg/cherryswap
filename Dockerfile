FROM node:16-alpine as dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder

ARG NEXT_PUBLIC_CONTENT_API_URL
ARG CHANGE_NOW_API_URL
ARG CHANGE_NOW_API_KEY
ARG CHANGE_NOW_EXCHANGE_STATUS_API

ENV NEXT_PUBLIC_CONTENT_API_URL=$NEXT_PUBLIC_CONTENT_API_URL
ENV CHANGE_NOW_API_URL=$CHANGE_NOW_API_URL
ENV CHANGE_NOW_API_KEY=$CHANGE_NOW_API_KEY
ENV CHANGE_NOW_EXCHANGE_STATUS_API=$CHANGE_NOW_EXCHANGE_STATUS_API

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
