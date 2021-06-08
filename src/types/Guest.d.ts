export default interface IGuest {
  id?: number;
  ipAddress?: string;
  region?: string;
  country?: string;
  firstVisit?: Date;
  lastVisit?: Date;
  votes?: UpVote[];
}
export interface UpVote {
  id?: number;
  voteByGuest?: number;
  cardId?: number;
}
