import { IContent } from "./Content";

export default interface IChapter {
    startRange: number;
    endRange: number;
    posts: IContent[];
}