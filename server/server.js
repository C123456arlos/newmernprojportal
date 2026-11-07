import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import {clerkMiddleware} from '@clerk/express'
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1"])
const app = express()
await connectDB()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.post('/webhooks', clerkWebhooks)