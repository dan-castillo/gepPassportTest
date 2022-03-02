FROM node:14.17.0-alpine
COPY . /app
WORKDIR /app
RUN npm install --save node-sass@4.14.1 --unsafe-perm=true --allow-root
RUN npm install
RUN npm install --save @ng-select/ng-select
RUN npm install --save angular-6-social-login
RUN npm install -g @angular/cli@7.3.9
RUN npm install -g serve
RUN npm install -g concurrently
RUN npm upgrade -g @angular/cli
RUN ng build  --output-hashing all

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY --from=build /app/dist/dakishan /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
