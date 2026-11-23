import express from 'express'
import helmet from 'helmet'
import { errorHandler } from './middleware/errorHandler.js'
import { analyzeRouter } from './routes/analyze.js'
import { extractRouter } from './routes/extract.js'
import { healthRouter } from './routes/health.js'
import { translateRouter } from './routes/translate.js'

try {
  process.loadEnvFile()
} catch {
  // No .env file; rely on the real environment.
}

const app = express()
app.disable('x-powered-by')
app.use(helmet())
const port = Number(process.env.PORT ?? 3001)

app.use('/api', healthRouter)
app.use('/api', extractRouter)
app.use('/api', analyzeRouter)
app.use('/api', translateRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
