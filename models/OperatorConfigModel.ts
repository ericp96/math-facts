import Realm, { ObjectSchema } from 'realm';

export class OperatorConfig extends Realm.Object<OperatorConfig> {
  _id!: Realm.BSON.ObjectId;
  operator!: string;
  enabled!: boolean;
  config!: any;

  static schema: ObjectSchema = {
    name: 'OperatorConfig',
    properties: {
      _id: 'objectId',
      operator: 'string',
      enabled: 'boolean',
      config: 'dictionary',
    },
    primaryKey: '_id',
  };
}
