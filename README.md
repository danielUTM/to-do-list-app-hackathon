run ```npm install``` to install require node packages for development.

```npm test``` will run tests (from tests directory)

Run ```echo "PORT=8080\nUSERNAME=[username]" > .env``` to set the port number and username which the server will run on. This must be run before the below commands.

Run server with ```nodemon src/server.ts``` during development

To run in production, compile src/app.ts to JavaScript with ```npx tsc```, then run compiled file with ```node build/src/server.js```

To auto-build documentation for SQL Methods run ```npx typedoc src/sqlMethods.ts```
