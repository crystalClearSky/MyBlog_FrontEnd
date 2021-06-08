export default interface IWriteComment {
  id?: number;
  message?: string;
  isReply?: boolean;
  avatarId?: number;
  flaggedCommentMessages?: string;
}