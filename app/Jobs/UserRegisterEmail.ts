import { JobContract } from '@ioc:Rocketseat/Bull'

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

export default class UserRegisterEmail implements JobContract {
  public key = 'UserRegisterEmail'

  public async handle(job) {
    const { data } = job
    // Do somethign with you job data
    
  }
}
