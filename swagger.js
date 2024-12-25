const swaggerAutogen = require('swagger-autogen')();
const PORT = process.env.PORT || 5000;

const doc = {
    info: {
        title: 'The Alter Office',
        description:   'Url shorner project Register to project by email and password, Create token by login, After login the token use in all the api as authorization.'
    },
    host: `localhost:${PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['./routes/routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc... */

swaggerAutogen(outputFile, routes, doc);