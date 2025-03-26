import Realm, { Dictionary, ObjectSchema } from 'realm';

type Range = {min: number, max: number}

interface Config extends Dictionary {
}

export class OperatorConfig extends Realm.Object<OperatorConfig> {
  _id!: Realm.BSON.ObjectId;
  operator!: string;
  enabled!: boolean;
  config!: Config;
  userId!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'OperatorConfig',
    properties: {
      _id: 'objectId',
      operator: 'string',
      enabled: 'bool',
      config: 'mixed{}',
      userId: 'objectId',
    },
    primaryKey: '_id',
  };
}
