// eslint-disable-next-line
import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    eaters: {
      id: string
      name: string
      username: string
      session_id?: string
    }
    meals: {
      id: string
      name: string
      description: string
      date: string
      is_on_diet: boolean
      eater_id: string
    }
  }
}
