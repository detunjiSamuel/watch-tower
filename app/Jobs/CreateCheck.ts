import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'


/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class CreateCheck implements JobContract {
  public key = 'CreateCheck'

  public async handle(job) {
    const { data } = job
    Logger.info(data)
    // Do somethign with you job data
  }
}
