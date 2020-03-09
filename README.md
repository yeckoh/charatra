TODO: replace the git repo name with MagicPages.

step 1. install nodejs + npm

step 2. install mongodb. mongo-compass is like mysqlworkbench, you can check records and CRUD. New connection: localhost:27017

step 3. specify a path for the database collections. mongo\bin\mongod.exe --dbpath [path to a folder]

step 4. use npm to install module dependencies. /charatra/ npm install

step 5. run nodejs. /charatra/node server

step 6. in a separate shell, run Angular. /charatra/frontend/ng serve

step 7. in a browser, connect to: http://localhost:4200

# ~~charatra~~ MagicPages
you might need to npm i -g @angular/cli

Angular: /charatra/frontend/

NodeJS: /charatra/

PassportJS: /charatra/controllers/passport.js <--(used by /models/user)

Mongoose Schemas: /charatra/models/

socket.io is loaded in /charatra/server.js

Backend WebSocket Hooks (listeners + emitters): /charatra/models/user.model.js

Frontend WebSocket Hooks: /charatra/frontend/src/app/secret-socket/secret-socket.component.ts

# to (sort of) deploy, change localhost:4200 urls in:
Express CORS origin policy <---- charatra/server.js

Angular user auth httproute <---- charatra/frontend/src/app/shared/auth.service.ts

Angular socket connection target url <---- charatra/frontend/src/app/secret-socket/secret-socket.component.ts

Run ng server --host (ip4)

Make sure the appropriate ports are open if necessary

## boilerplate stuff:
# Material

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
