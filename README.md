# USAble-Life-Interview-Project

This project was an Interview Project for USAble Life (completed within 2 weeks)
It is meant to showcase my current skills as of 6/21/2021 - 7/5/2021

To get the project running 

Step 1: Create a db in SSMS on your localhost called "USAble_DB"
    
    * Open up your localhost in SSMS
    * Right click on "Databases"
    * Select "New Database"
    * Enter "USAble_DB" into Database name field and click "OK"
    
Step 2: Open the project in Visual Studio 2019

Step 3: Publish the USAble_DB project to the database you created in step 1.

    * Right click the USAble_DB project
    * Select "Publish"
    * Click on "Edit" to the right of "Target database connection"
    * Click on "Browse" tab and select your local host from "Local" section
    * Select USAble_DB database from the Database Name drop down
    * Click on Test Connection to make sure you are connected to the database and then click on OK
    * Click on Publish
  
Step 4: Make sure USAble_Web project is selected as the start-up project

    * Right click the USAble_Web project
    * Click on "Set as Startup Project"
    
Step 5: You are good to run the project now

Notes:

There is a script in the USAble_DB project that will allow you to drop all tables so you can re-publish the DB for a reset of the initial project. 
(In case you want to clear the data and re-initialize the DB data.)