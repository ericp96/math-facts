import Realm, { ObjectSchema } from 'realm';

export class OperatorConfig extends Realm.Object<OperatorConfig> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  static schema: ObjectSchema = {
    name: 'OperatorConfig',
    properties: {
      _id: 'objectId',
      name: 'string',
      // Fix me
      numbersToGenerate: 'number',
      operator: 'string',
      minNumber: 'number',
      maxNumber: 'number',
    },
    primaryKey: '_id',
  };
}
