# UniCar - Backend

This project is a cross-platform mobile application built with Node.js, Express, and Firebase.


## Installation

1. Clone the repository:

 ```bash
 git clone https://github.com/jonaprg/UniCar.git
 ```
2. Navigate to the project directory:

 ```bash
cd UniCar
```

3. Install the dependencies:

 ```bash
npm install
```

4. Set up Firebase:

  - Create a new Firebase project at https://console.firebase.google.com.
  - Generate your Firebase configuration object with Firebase Storage and Authentifcation enable.
  - Add the Firebase configuration to your project's .env file:
  ```
{
  "type": "service",
  "project_id": "name",
  "private_key_id": "id",
  "private_key": "private-key",
  "client_email": "client email",
  "client_id": "client id",
  "auth_uri": "auth",
  "token_uri": "token",
  "auth_provider_x509_cert_url": "certs",
  "client_x509_cert_url": "cert"
}

```
5. Run 

```bash
npm run dev
```
5.1 Run linter javascript
```bash
  npm run lint
```
5.2 Run test
```bash
 node --test
```












