# Techo-Secure-App-Backend

## How to Create a New Table and Model

### Prerequisites
- Install the ESLint plugin for VS Code.
- Install Sequelize CLI and Husky by running the following command:
  ```bash
  ```bash
  npm install --save-dev
  npm install --save-dev prettier
  npm install -g sequelize-cli
  npm install eslint husky --save-dev
  npm install eslint-plugin-node@latest --save-dev
  npm install eslint-plugin-node babel-eslint --save-dev
  npm install eslint --save-dev
  ```
  ```

### Create New Model

    ```bash
    ```bash
    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
    ```
    ```

### Create New Migration
     ```bash
     ```bash
     npx sequelize-cli migration:generate --name add-column-to-users
     ```
     ```


### Create a new migration table & model at once:
    ```bash
    ```bash
    npx sequelize-cli model:generate --name Product --attributes name:string,price:decimal
    ```
    ```

### Alter Table
    ```bash
    ```bash
    npx sequelize-cli migration:generate --name alter-table
    Make sure that your migration file looks like

    'use strict';
        module.exports = {
        up: (queryInterface, Sequelize) => {
            return queryInterface.addColumn('TableName', 'columnName', {
            type: Sequelize.STRING,
            allowNull: false,
            });
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.removeColumn('TableName', 'columnName');
        },
        };
    ```
    ```

### Migrate the table by running the following command. By default, it selects the development environment.
    ```bash
    ```bash
    # Migrate tables locally
    npx sequelize-cli --env local db:migrate

    # Migrate tables in stagging
    npx sequelize-cli --env development db:migrate
    ```
    ```

### Create a new seeder by running the following command:

    ```bash
    ```bash
    # For local environment
    NODE_ENV=local npx sequelize-cli db:seed --seed 001-create-admin.js
    ```
    ```

### Undo migration by running the following command:

    ```bash
    npx sequelize-cli db:migrate:undo
    ```

### Make sure to add the following line in each migration code:

    ```bash
    ```bash
    const sequelize = require('../config/db.config');
    ```
    ```
### Run Seeder with the local environment:

    ```bash
    ```bash
        NODE_ENV=local sequelize db:seed:all
    ```
    ```
    npx sequelize-cli db:seed:all

### Create the  migration table:

    ```bash
    ```bash
    npx sequelize-cli migration:generate --name create-<table_name>-table
    ```
    ```
### Create a migration table with a model:

    ```bash
    ```bash
    npx sequelize-cli model:generate --name <MoelName> --attributes field_name:string
    ```
    ```

### TO Drop Data From DB
    ` SET session_replication_role = replica;
    ` DROP SCHEMA public CASCADE;
    ` CREATE SCHEMA public;

### Events For Web



### Other Command TO Refresh Local DB
npx sequelize-cli --env local db:migrate:undo:all && npx sequelize-cli --env local db:migrate
npx sequelize-cli --env development db:migrate:undo:all && npx sequelize-cli --env development db:migrate

### command to migrate
npx sequelize-cli db:migrate



export const searchBus = async (req, res) => {
  try {
    const { departureDate, returnDate, pickupLocation, destinationLocation, ac_or_nonAc, seating_capacity } = req.body;

    // Coordinates of the pickup location (assuming it's provided as latitude and longitude)
    // const pickupCoordinates = {
    //   latitude: pickupLocation.latitude,
    //   longitude: pickupLocation.longitude,
    // };

    // Fetch all buses from the database
    const allBuses = await BusModel.findAll({
      where: {
        ac_or_nonAc: ac_or_nonAc,
        seating_capacity: seating_capacity,
        is_active: true,
        is_deleted: false,
        // form_date: departureDate,
        // to_date: returnDate,
      },
    });

    // // Filter buses within a 30 km radius
    // const busesWithinRadius = allBuses.filter((bus) => {
    //   const busCoordinates = {
    //     latitude: bus.latitude, // Replace with the actual latitude field in your BusModel
    //     longitude: bus.longitude, // Replace with the actual longitude field in your BusModel
    //   };

    //   const distance = geolib.getDistance(pickupCoordinates, busCoordinates);

    //   // Assuming 30 km radius, adjust as needed
    //   return distance <= 30000; // 30 km in meters
    // });

<<<<<<< HEAD
    return response.successResponse(
      res,
      200,
      { buses: allBuses },
      HTTP_MESSAGES.EN.GET_BUS_RESULTS
    );
  } catch (error) {
    console.error(error);
    return response.somethingErrorMsgResponse(
      res,
      500,
      error
    );
  }
};


ALTER TYPE "enum_Appointments_appointment_type" ADD VALUE 'LABTEST' AFTER 'VACCINATION';
# bus_booking_app
>>>>>>> 3d060dc462162f1874be8c72f9178731662ea06b



if you have a ssl 
then change in index.js file 
add the path of ssl in  
 var https_options = {
      key: fs.readFileSync("/home/ubuntu/SSL/STAR_replybot_ai.key"),
      cert: fs.readFileSync("/home/ubuntu/SSL/STAR.replybot.ai.crt"),
      ca: [
        fs.readFileSync('/home/ubuntu/SSL/STAR.replybot.ai.p7b'),
        fs.readFileSync('/home/ubuntu/SSL/STAR.replybot.ai.ca-bundle')
      ]
    }
if you change the port no than change in .env file  PD_PORT=8000  as well as domain name PD_HOST="https://cosmical-events-backend.onrender.com"

and change in react js env.production file REACT_APP_BASE_URL = "https://cosmical-events-backend.onrender.com"
asasas