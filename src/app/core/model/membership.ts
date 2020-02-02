import { firestore } from 'firebase/app';
import { GroupRef, UserRef, } from './';

export interface Membership {
  user: UserRef;
  group: GroupRef;
  confirm: boolean;
  data: string;  // email or url
}

export type NewMembership = Omit<Membership, 'id'>;
export type MembershipRef = firestore.DocumentReference;
