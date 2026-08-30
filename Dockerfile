#BUILD STAGE
FROM node:22 AS build

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

#PRODUCTION STAGE
FROM nginx:alpine

COPY --from=build /app/dist/online-course-platform/browser /usr/share/nginx/html
EXPOSE 4200
CMD [ "nginx", "-g", "daemon off;" ]