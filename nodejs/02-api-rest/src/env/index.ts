import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['pg', 'sqlite']).default('sqlite'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    '🚨🚨🚨 Invalid environment variables 🚨🚨🚨\n\n',
    _env.error.format(),
    '\n/// -------------------------------------- ///\n\n',
  )
  throw new Error('\n\nInvalid environment variables\n')
}

export const env = _env.data
