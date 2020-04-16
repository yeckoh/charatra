step 1. install nodejs + npm

step 2. install mongodb. mongo-compass is like mysqlworkbench, you can check records and CRUD. New connection: localhost:27017

step 3. specify a path for the database collections. mongo\bin\mongod.exe --dbpath [path to a folder]

step 4. use npm to install module dependencies. /magicpages/ npm install

step 5. run nodejs. /magicpages/node server

step 6. in a separate shell, run Angular. /magicpages/frontend/ng serve

step 7. in a browser, connect to: http://localhost:4200

# ~~charatra~~ MagicPages
you might need to npm i -g @angular/cli

Angular: /magicpages/frontend/

NodeJS: /magicpages/

PassportJS: /magicpages/controllers/passport.js <--(used by /models/user)

Mongoose Schemas: /magicpages/models/

socket.io is loaded in /magicpages/server.js

Backend WebSocket Hooks (listeners + emitters): /magicpages/routes/*_hooks.js

Frontend WebSocket Hooks: /magicpages/frontend/src/app/*.component.ts (not all components have listeners)

Frontend Websocket listenfor() and sendback(): /magicpages/frontend/src/app/shared/chara.service.ts

# to (sort of) deploy, change localhost:xxxx urls in:
Express CORS origin policy <---- /magicpages/server.js <==== [.use(cors()) to allow all incoming]

Angular user auth httproute <---- /magicpages/frontend/src/app/shared/auth.service.ts <==== NodeJS target url

Angular socket connection target url <---- /magicpages/frontend/src/app/shared/chara.service.ts <==== NodeJS target url

Run ng server --host (ip4) <==== simulate build on development machine

OR ng build --prod <---- will compile to /frontend/dist/ <==== host this on apache or something

Run /magicpages/ node server

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
