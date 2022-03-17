// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
    authDomain: 'jerens-app.firebaseapp.com',
    projectId: 'jerens-app',
    storageBucket: 'jerens-app.appspot.com',
    messagingSenderId: '1009489116025',
    appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
    measurementId: 'G-SNRQJJZH3L',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const { FCM_VAPID_KEY } = process.env

export const getCredentialsToken = async () => {
    const messaging = getMessaging(firebaseApp)
    let currentToken = ''

    try {
        currentToken = await getToken(messaging, { vapidKey: FCM_VAPID_KEY })
        if (currentToken) {
            console.log(currentToken)
        } else {
            console.log(currentToken)
        }
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error)
    }

    return currentToken
}
