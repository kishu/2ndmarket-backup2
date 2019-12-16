import { firestore } from 'firebase/app';

export interface Group {
  id: string;
  domain: string;
  name: string;
  type: 'corp' | 'school' | 'apt';
}

// export type NewGroup = Omit<Group 'id'>;
export type GroupRef = firestore.DocumentReference;
