Waundr
=====================

A real time social walking experience.

### Loading Waundr

In order to run this you must first create a .env file.
The .env file is for authentication for google and facebook and linking it with the postgres server.

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_SSL=
DB_PORT=5432

CLIENTID="Google ID"
CLIENTSECRET="Google Client secret"

APPID="Facebook ID"
APPSECRET="Facebook Secret"

```

Open a terminal and enter the following commands

```
npm install, // to install the dependencies
npm start
open http://localhost:3000

```

In order to get the server working. Open another terminal and enter the following commands.

```
cd production
npm install
npm start
```
In order to get project veronica working.
```
cd veronica
react-native run-ios; // react-native run-andriod
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* express": "^4.15.3",
* hover.css": "^2.2.0",
* jquery": "^3.2.1",
* material-ui": "^0.18.3",
* materialize-css": "^0.98.2",
* passport-facebook": "^2.1.1",
* passport-twitter": "^1.0.4",
* prop-types": "^15.5.10",
* react": "15.4.2",
* react-dom": "15.4.2",
* react-materialize": "^1.0.1",
* react-router": "^4.1.1",
* react-router-dom": "^4.1.1",
* redis": "^2.7.1",
* ws": "3.0.0"
* "body-parser": "^1.17.2",
* "connect-flash": "^0.1.1",
* "cookie-parser": "^1.4.3",
* "cors": "^2.8.3",
* "dotenv": "^4.0.0",
* "express": "^4.15.3",
* "express-session": "^1.15.3",
* "node-craigslist": "^1.1.2",
* "passport": "^0.3.2",
* "passport-facebook": "^2.1.1",
* "passport-google-oauth": "^1.0.0",
* "pg": "^6.3.1",
* "pg-hstore": "^2.3.2",
* "redis": "^2.7.1",
* "request-promise": "^4.2.1",
* "sequelize": "^4.1.0",
* "google-map-react": "^0.24.0",
* "react": "^15.6.1",
* "react-native": "0.45.1",
* "react-native-deprecated-custom-components": "^0.1.0",
* "react-native-maps": "^0.15.2",
* "react-native-material-kit": "^0.4.1",
* "react-native-pulse": "^1.0.4",
* "react-redux": "^5.0.5",
* "redux": "^3.7.1"
