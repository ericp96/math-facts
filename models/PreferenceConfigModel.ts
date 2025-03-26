import Realm, { ObjectSchema } from 'realm';

export class PreferenceConfig extends Realm.Object<PreferenceConfig> {
  _id!: Realm.BSON.ObjectId;
  currentUser!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'PreferenceConfig',
    properties: {
      _id: 'objectId',
      currentUser: 'objectId',
    },
    primaryKey: '_id',
  };
}
