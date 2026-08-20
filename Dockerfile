FROM node:20-alpine

WORKDIR /app

# Docker often reports the host CPU count. Next 16 then starts that many
# Turbopack/Tokio workers and the builder dies with os error 11 (EAGAIN).
ENV NEXT_CPUS=1
ENV TOKIO_WORKER_THREADS=1
ENV RAYON_NUM_THREADS=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
