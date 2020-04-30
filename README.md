# COSC 2123 - SEMP

#### Author: Nguyen Le Bao Anh

#### Setup instructions
- Install these softwares first:
  - [maven](https://maven.apache.org/download.cgi)
  - [nodejs](https://nodejs.org/en/)
  - [jdk(>=8)](https://openjdk.java.net/install)
  - [MariaDB](https://downloads.mariadb.org/)
- Clone this repo
- Open the terminal
- Database Setup:
  - Login: ```mysql -u root -p```
  - Create new database: ```create database dev;```
  - Create new user: ```create user 'pi' identified by 'GAtech321';```
  - Grant privilege: ```grant all privileges on dev.* to 'pi'@localhost;```
  - Flush privilege: ```flush privileges;```
  - Exit
- Start the backend by following these steps:
  - Move to the backend folder: ```cd backend```
  - Install dependencies: ```mvn clean install```
  - Wait for the installations
  - Start the backend: ```mvn spring-boot:run```
- Start the frontend by following these steps:
  - Move to the backend folder: ```cd client```
  - Install dependencies: ```npm i```
  - Wait for the installations
  - Start the backend: ```npm start```
- Default login info:
  ```
  username: a000001
  password: GAtech321!
  ```