import { View } from "./Content";

export default interface IAvatar {
  id?: number;
  name?: string;
  currentIP?: string;
  isCheckedIn?: boolean;
  avatarImgUrl?: string;
  joinedOn?: Date;
  lastCheckedIn?: Date;
  likes?: any[];
  comments?: any[];
  upVotes?: any[];
  replies?: any[];
  tagEntities?: TagEntity[];
  flagEntity?: any;
  viewedContent?: View[];
}
 export interface Comment {
   id?: number;
   avatarId?: number;
   message?: string;
   lastUpdatedOn?: Date;
   postedOn?: Date;
   cardEntity?: any;
   cardEntityId?: number;
   isReply?: boolean;
   searchIndexValue?: number;
   isSuperUser?: any;
   userEntity?: any;
   likes?: any[];
   response?: any[];
   isActive?: boolean;
 }

 export interface TagEntity {
   id: number;
   tagItem: string;
   cardEntity?: any;
   cardId: number;
   byAvatarId: number;
   isSuperUser?: any;
   userEntity?: any;
   isActive: boolean;
 }