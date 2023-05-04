import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation failed",
      issues: error.issues
    })
  }

  if(env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
     // TODO: send error to datadog or sentry
  }

  return reply.status(500).send({
    message: "Internal server error"
  })
})
