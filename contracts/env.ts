/**
 * Contract source: https://git.io/JTm6U
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
declare module '@ioc:Adonis/Core/Env' {
  /*
   |--------------------------------------------------------------------------
   | Getting types for validated environment variables
   |--------------------------------------------------------------------------
   |
   | The `default` export from the "../env.ts" file exports types for the
   | validated environment variables. Here we merge them with the `EnvTypes`
   | interface so that you can enjoy intellisense when using the "Env"
   | module.
   |
   */

   type CustomTypes = typeof import('../env').default
   interface EnvTypes extends CustomTypes {}
}
/**
  * Depending upon the database driver you are using, you must validate
  * the environment variables defined.
  *
  * The following is an example for PostgreSQL.
  */
export default Env.rules({
  DB_CONNECTION: Env.schema.string(),
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),

})
