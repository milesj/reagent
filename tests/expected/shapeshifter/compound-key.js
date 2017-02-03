// @flow
import Schema from 'shapeshifter';

export const CompoundSupportSchema = new Schema('compounds', ['start_date', 'end_date', 'user_id']);

export type CompoundSupportType = {
  status: ?number,
  user_id: ?number,
  start_date: ?string,
  end_date: ?string,
};
