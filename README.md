# MERN-Social-Network
A single-page social-network developed with MERN stack & Redux. Screenshots below!!

# Quick liks
1. [Screenshots](#screenshots)
2. [Own the project](#own-the-project)

# Screenshots
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.27.11.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.27.24.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.27.34.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.27.45.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.29.13.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.29.48.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.30.13.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.31.06.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.29.35.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Single-Page-Social-Network/master/screenshots/Snap%202017-07-27%20at%2000.28.54.png)

[More screenshots](https://github.com/yTakkar/Single-Page-Social-Network/tree/master/screenshots).

UI is taken from [Instagam-clone](https://github.com/yTakkar/Instagram-Clone) I created!!

# Own the project
1. First install all dependencies with npm or Yarn:
    ```javascript
    npm install
    ```
    or
    ```javascript
    yarn
    ```

2. Open PHPMyAdmin, create a DB & import `db.sql` file.
3. Create a `.env` file and insert the following code. Replace values with yours!!

    ```javascript
    PORT=YOUR_PORT
    MYSQL_HOST="host"
    MYSQL_USER="user"
    MYSQL_PASSWORD="password"
    MYSQL_DATABASE="db"
    MAIL="yourgmail@gmail.com"
    MAIL_PASSWORD="gmail-password"
    SESSION_SECRET_LETTER="anything-secret"
    ```

4. Start the server
    ```javascript
    npm run start
    ```

5. Now load the app
    ```javacript
    localhost:[PORT YOU DEFINED IN .ENV FILE]
    ```

6. Enjoy!!