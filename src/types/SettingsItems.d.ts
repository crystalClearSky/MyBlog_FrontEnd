import { UpVote, Like, View, Comment } from "./Content";

export default interface ISettings {
  upVotes?: UpVote[],
  likedComments?: Like[],
  viewedPosts?: View[],
  comments?: Comment[],
  tags?: Tag[]
}