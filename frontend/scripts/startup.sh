cd frontend && \
npm install && \
npm run build && \
pm2 kill && \
pm2 start ecosystem.config.cjs