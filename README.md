# Database initialisation

To start the database related to this project, simply run the following:

`docker-compose up -d`

This container will start a mongo@4.4 with a database containing every tables needed + some data.

# ForestAdmin project setup

Now the database is running, reach your ForestAdmin UI and create a sample project to get an `FOREST_ENV_SECRET` and `FOREST_AUTH_SECRET`

Once you have those secrets, use them to replace the current values in the `.env` file.

# Server startup

Once you have started your database, install the packages:

`npm install` | `yarn`

Then start the server in development mode

`npm run dev` | `yarn run dev`

Now you can edit the project. It will be compiled and restarted on any change.
