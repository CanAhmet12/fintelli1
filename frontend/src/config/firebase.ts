import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDktgj8afXC8JuhWJPQ5dtVCdGAxkJGuyw",
  authDomain: "vesterfly.firebaseapp.com",
  projectId: "vesterfly",
  storageBucket: "vesterfly.firebasestorage.app",
  messagingSenderId: "614446692527",
  appId: "1:614446692527:web:dfc348031135e6c06e3c5a",
  measurementId: "G-H6GD2F7ZJB"
}

// Firebase'i başlat
const app = initializeApp(firebaseConfig)

// Auth ve Firestore servislerini al
export const auth = getAuth(app)
export const db = getFirestore(app) 