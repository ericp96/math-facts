import Realm, { ObjectSchema } from 'realm';

export class UserConfig extends Realm.Object<UserConfig> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  examTime!: number;

  static schema: ObjectSchema = {
    name: 'UserConfig',
    properties: {
      _id: 'objectId',
      name: 'string',
      examTime: 'int',
    },
    primaryKey: '_id',
  };
}
