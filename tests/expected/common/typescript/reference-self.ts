/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

export interface ReferenceSelfBasicInterface {
  stringField?: string;
}

export interface ReferenceSelfInterface {
  stringField?: string;
  referenceField?: ReferenceSelfInterface;
  requiredRefField?: ReferenceSelfInterface | null;
  subsetRefField: Array<ReferenceSelfBasicInterface>;
}
