import {Comment} from "../model/Comment";
import {SEA} from "gun";
import {gun} from "./index";
import dayjs from "dayjs";

export class CommentGun {

    async addComment(comment: Comment, id: string, password: string) {
        if (comment !== undefined) {
            const name = await SEA.encrypt(comment.name, password);
            const commentString = await SEA.encrypt(comment.comment, password);
            const time = await SEA.encrypt(comment.time, password);
            // @ts-ignore
            gun.db.get("poll").get(id).get("comment").get(comment.id).get("name").put(name)
            // @ts-ignore
            gun.db.get("poll").get(id).get("comment").get(comment.id).get("comment").put(commentString)
            // @ts-ignore
            gun.db.get("poll").get(id).get("comment").get(comment.id).get("time").put(time)
        }
    }


    async getAllComments(id: string, password: string) {
        const value = await gun.db.get("poll").get(id).get("comment");
        const returnArray: Array<Comment> = new Array<Comment>();
        for (let valueKey in value) {
            if (valueKey !== "_") {
                const encName = await gun.db.get("poll").get(id).get("comment").get(valueKey).get("name");
                const encCommentString = await gun.db.get("poll").get(id).get("comment").get(valueKey).get("comment");
                const encTime = await gun.db.get("poll").get(id).get("comment").get(valueKey).get("time");
                const name = await SEA.decrypt(encName, password) as string;
                const commentString = await SEA.decrypt(encCommentString, password) as string;
                const time = await SEA.decrypt(encTime, password) as string;

                returnArray.push(new Comment(name, commentString, dayjs(time), valueKey))
            }
        }
        return returnArray;
    }

}


export const commentGun = new CommentGun();