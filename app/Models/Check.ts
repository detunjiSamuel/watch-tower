
import User from 'App/Models/user'
import Ping from 'App/Models/Ping'
import { DateTime } from 'luxon'
import { BaseModel, column , beforeCreate , BelongsTo , belongsTo , hasMany , HasMany } from '@ioc:Adonis/Lucid/Orm'
// import { v4 as uuidv4 } from 'uuid'
export default class Check extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public pingAddress: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Ping)
  public Checks: HasMany<typeof Ping>

  @beforeCreate()
  public static assignUuid (check: Check) {
    // check.pingAddress = uuidv4()
  }
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>
}
