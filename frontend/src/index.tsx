import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "./Application";
import reportWebVitals from "./reportWebVitals";

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyCTuvXAX9Dell2uyfKc-WYWOH-vahMtIgo",
//     authDomain: "wishlist-mcbeer.firebaseapp.com",
//     projectId: "wishlist-mcbeer",
//     storageBucket: "wishlist-mcbeer.appspot.com",
//     messagingSenderId: "450881262627",
//     appId: "1:450881262627:web:183512a7f7a75533864d96",
//     measurementId: "G-K2DDRC38JH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
