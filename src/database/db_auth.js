import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import dotenv from 'dotenv'

dotenv.config()

const app = initializeApp({
  credential: applicationDefault()
})

const db = getFirestore(app)
const auth = getAuth(app)
export default { db, auth }
