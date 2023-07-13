House Marketplace React Application
Welcome to the House Marketplace React application! This application allows users to browse and search for houses and apartments available for sale or rent. Users can view detailed information about each property, including its location, and easily contact the landlord via email. The application supports user authentication using OAuth with Google accounts or traditional registration and login using forms. Additionally, logged-in users have the ability to manage their own listings by creating, modifying, or deleting them. Firebase is used as the backend service for storing user information, including user authentication, and property listings.

Try this application on link: https://house-marketplace-dika-bosnjak.vercel.app/

Prerequisites
To run this application locally, you need to have the following installed on your machine:

Node.js (v12.0.0 or higher)
npm (v6.0.0 or higher) or yarn (v1.0.0 or higher)

Installation
Clone the repository
Navigate to the folder
Install the dependencies using npm or yarn


Configuration
Before running the application, you need to configure the Firebase project and obtain the necessary credentials.

- Create a Firebase project at https://console.firebase.google.com if you haven't already.

- Enable the Google Auth provider in the Firebase Authentication settings.

- Set up a Firestore database in Firebase to store the user information and property listings.

- Copy the Firebase project configuration object. You can find it in the Firebase project settings.

- Create a .env file in the root directory of the project and add the environment variables.

Features
Authentication
Users can sign up and log in to the application using either their Google accounts or the traditional registration and login forms.
OAuth with Google accounts is supported, allowing for a seamless authentication process.
Firebase Authentication is used to securely store user credentials and manage the authentication flow.
Property Listings
Users can browse and search for houses and apartments available for sale or rent.
Detailed information about each property, including its location and contact details of the landlord, is displayed.
Logged-in users have the ability to manage their own property listings, including creating new listings, modifying existing ones, and deleting listings.
Firebase Firestore is used to store and retrieve property listing data.
Firebase Setup
To enable the authentication and database functionalities, you need to set up Firebase for the project.

Google Auth Provider
Go to the Firebase console.
Navigate to your project.
In the left sidebar, click on "Authentication".
In the "Sign-in method" tab, enable the "Google" sign-in provider.
Follow the instructions to configure the Google Auth provider with your application.
Copy the generated credentials (API key, client ID, etc.) for use in the application.
Firestore Database
Go to the Firebase console.
Navigate to your project.
In the left sidebar, click on "Firestore Database".
Click on "Create database" to create a new Firestore database.
Choose the location for your database.
Start the database in "Production mode".
Click on "Enable" to enable the Firestore database.
