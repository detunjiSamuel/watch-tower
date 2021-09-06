import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo , BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Check from 'App/Models/Check'
export default class Ping extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public checkId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Check, {
    foreignKey: 'checkId',
  })
  public check: BelongsTo<typeof Check>
}
