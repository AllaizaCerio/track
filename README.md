# Track
Track is an application created through React library.

# Pre-requisite
Ngrok is required to run the server of this project. 
Download and install it through [ngrok](https://ngrok.com/download). 
Setup an account and configure the authtoken. 

To run app on physical mobile devices, install **Expo Go** from the App Store or **Expo** from Google Play Store.

# How to run project server and on mobile device.
1. Download repo.
2. Navigate to the project folder and install dependencies.
```
npm install --legacy-peer-deps
```
3. Start ngrok tunnel in port 3000
```
ngrok http 3000
```
4. Copy the **Forwarding** Link.

![image](https://github.com/AllaizaCerio/track/assets/51012358/f7afc41c-b783-435e-a6a8-cf2f0654c037)

5. Navigate to tracks/src/api/tracker.js file and replace 'baseURL' with the copied link.

![image](https://github.com/AllaizaCerio/track/assets/51012358/f3435ba7-8af4-4c95-a5d7-e1c2b4d538a7)

7. Navigate back to tracks/track-server/ folder and run server.
```
npm run dev
```
8. Go back to tracks/ directory and run app.
```
npm start
```
Scan the QR code using mobile device's camera and open project in Expo Go.
