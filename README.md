

# **RMIT SEPT 2021 Major Project**

# **GROUP 5 - MONDAY 17:30**

## Members

- Tuan Vu (s3678491)
- Phu Nguyen (s3598775)
- Janidu Higgoda (s3846409)
- Edward Kahiro Kuo (s3691466)

## Links

- Production application: http://sept-fe-alb-1073804615.ap-southeast-2.elb.amazonaws.com/login 
- Jira Board :https://rmit-sem2-2020-sept.atlassian.net/jira/software/projects/SEPT/boards/1
- Google Drive: https://drive.google.com/drive/folders/18kW9jfiFCXPbgCMZUp5PTuZitl4wcct3?usp=sharing

## Running Frontend  on Windows (Powershell/WSL terminal)/Mac/Linux

Make sure your computer has nodejs and npm installed. Install nodejs and npm here if you don't have: https://nodejs.org/en/

You can verify by type in this command: 

`node --version`

`npm --version`

1. From the root directory SEPT_TeamProject_Sem2_2021/ `cd FrontEnd/myfirstapp`
2. `npm install`
3. `npm start`

## Running Backend on Windows (Powershell/WSL terminal)/Mac/Linux

Make sure your computer has maven installed. Install maven here if you don't have: https://maven.apache.org/download.cgi

You can verify by type in this command:

 `mvn --version`

1. From the root directory SEPT_TeamProject_Sem2_2021/  `cd Backend/` and run this command: `mvn install`
2. Make sure you have MySQL installed and have a schema named bookeroo set up with the correct credentials in the application.properties files of each microservices. 
3. From root directory SEPT_TeamProject_Sem2_2021/ `cd Backend/loginmicroservices`  and run this command: `mvn package`
4. Run this command to run the backend

 `java -jar target/loginmicroservices-1.0.0.jar`

6. From the root directory SEPT_TeamProject_Sem2_2021/ `cd Backend/bookmicroservices` and run this command: `mvn package`

7. Run this command to run the backend

 `java -jar target/bookmicroservices-1.0.0.jar`

8. From the root directory SEPT_TeamProject_Sem2_2021/ `cd Backend/transactionmicroservices` and run this command: `mvn package`
9. Run this command to run the backend

 `java -jar target/transactionmicroservices-1.0.0.jar`

## Gitflow

![image](https://user-images.githubusercontent.com/36873497/130311280-6faaaf1e-5078-474d-8fd6-f0c0fce8a9c4.png)

**Naming Convention**

Please give your branch a meaningful name which contains the issue tracker number on Jira, the developer's name and the short description of feature/user story to be implemented.

[issue number] - [developer] - [short description of feature]

Example:

SEPT4 - tedvu- browse_book_by_category

## CI/CD Deployment Diagram

### Frontend 

- Frontend CI is run in every pull request into Develop.

- Frontend CD is run in every merge into Develop.

![CICD-Frontend](https://user-images.githubusercontent.com/36873497/138535544-189add86-d8b4-49b4-bf5d-50faa8bcd7c4.png)

### Backend

- Backend CI is run in every pull request into Develop.

- Backend CD is run in every merge into Develop.

![img](https://lh6.googleusercontent.com/n0ni_eSjJg8RbENE3AP1hcc81uQRwtrwVbwAqXoqst5vBOcEQp05oqCyVdF6IIlhocfni3yOSvWLRn8K9z6HlXTmdeLbnxlTrWoct_AKFaIzvd_ts3lRXYEaPk0k-A=s1600)

