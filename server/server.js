import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import dns from "node:dns/promises"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'

dns.setServers(["1.1.1.1"])
const app = express()
await connectDB()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.send('api working'))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) })


// npm install @sentry/node @sentry/profiling-node --save