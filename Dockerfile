From node:13.12.0-alpine

#Declaring env

ENV NODE_ENV development

#Setting Up the work directory
WORKDIR /code/ux

#Install app dependencies
COPY ./package.json /code/ux
COPY ./package-lock.json /code/ux
RUN npm install --silent

#add app
COPY ./ /code/ux
Expose 3000
#Start app
CMD ["npm", "start"]