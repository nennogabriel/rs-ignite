import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import fastifyCookie from '@fastify/cookie'
import { logAllRequests } from './middlewares/log-all-requests'

const app = fastify()

app.register(fastifyCookie)
app.addHook('preHandler', logAllRequests)
app.register(transactionsRoutes, { prefix: '/transactions' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
