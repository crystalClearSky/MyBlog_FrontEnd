export class IContent {
  id?: number;
  title?: string;
  imageUrl?: string;
  images?: Image[];
  createdOn?: Date;
  updatedOn?: Date;
  isSuperUser?: boolean;
  tags?: Tag[];
  description?: string;
  searchIndexValue?: number;
  comments?: Comment[];
  upVotes?: UpVote[];
  postType?: number;
  tagIsActive?: boolean;
  replyBoxIsActive?: boolean;
  views?: View[];
  content?: string;
  chapterIndex?: [chapterId:number,index:number];
}

export interface Tag {
  id: number;
  tagItem: string;
  cardId: number;
  byAvatarId: number;
  isSuperUser?: any;
  isActive: boolean;
}

export interface View {
  id: number;
  viewedByGuestId: any;
  guestView: any;
  viewedByAvatarId: number;
  avatarView: any;
  viewedByUnregisteredGuest: any;
  unregisteredGuestView: any;
  anonymousId: any;
  anonymousView: any;
  cardEntityId: number;
  numberOfTimesSeen: number;
  firstSeen: string;
  lastSeen: string;
}

export interface Image {
  id: number;
  imageUrl: string;
  quickDescription: string;
  cardEntityId: number;
  uploadedOn: Date;
  updatedOn: Date;
  catergory: number;
  thumbnailUrl: string;
}

export interface Tag {
  id: number;
  tagItem: string;
  cardId: number;
  byAvatarId: number;
  isSuperUser?: any;
  isActive: boolean;
  cardsWithThisId: number;
}

export interface Reply2 {
  id: number;
  avatarId: number;
  message: string;
  lastUpdatedOn: Date;
  likesCount: number;
  postedOn: Date;
  cardEntityId: number;
  isReply: boolean;
  isSuperUser?: any;
  likes: any[];
  response: any[];
  isActive: boolean;
  replyCount: number;
}

export interface Response2 {
  avatarId: number;
  reply: Reply2;
  commentId: number;
  responseToCommentId: number;
  isSuperUser?: any;
  hasReplied: boolean;
}

export interface Reply {
  id: number;
  avatarId?: number;
  message: string;
  lastUpdatedOn: Date;
  likesCount: number;
  postedOn: Date;
  cardEntityId: number;
  isReply: boolean;
  isSuperUser?: boolean;
  likes: any[];
  response: Response2[];
  isActive: boolean;
  replyCount: number;
  flaggedCommentMessages: string;
}

export interface Response {
  avatarId: number;
  reply: Reply;
  commentId: number;
  responseToCommentId: number;
  isSuperUser?: boolean;
  hasReplied: boolean;
}

export interface Comment {
  id: number;
  avatarId: number;
  message: string;
  lastUpdatedOn: Date;
  likesCount: number;
  postedOn: Date;
  cardEntityId: number;
  isReply: boolean;
  isSuperUser?: any;
  likes: any[];
  response: Response[];
  isActive: boolean;
  replyCount: number;
  replyToCommentId: number;
  ResponseToAvatarId: number;
  showItem: boolean;
  flags: Flag[];
  flaggedCommentMessages: string;
  links: Link[];
}

export interface Link {
  id: number;
  link: string;
  linkIndex: number;
  commentEntityId: number;
  linkType: number;
}

export interface UpVote {
  id: number;
  voteById: number;
  cardId: number;
}

export interface Flag {
  id: number;
  reasonText: string;
  avatarId: number;
  cardEntityId: number;
}
