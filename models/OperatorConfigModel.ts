import Realm, { Dictionary, ObjectSchema } from 'realm';

interface Config extends Dictionary {}

export class OperatorConfig extends Realm.Object<OperatorConfig> {
  _id!: Realm.BSON.ObjectId;
  operator!: string;
  enabled!: boolean;
  config!: Config;

  static schema: ObjectSchema = {
    name: 'OperatorConfig',
    properties: {
      _id: 'objectId',
      operator: 'string',
      enabled: 'bool',
      config: 'mixed',
    },
    primaryKey: '_id',
  };
}
