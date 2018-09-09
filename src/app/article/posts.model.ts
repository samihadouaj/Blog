export class PostModel {
    constructor(
        public title: string,
        public subject: string,
        public content: string,
        public type: string,
        public likes ?: number,
        public date?: Date,
        public comments?: string[],
        public _id?: string,
        public owner?: {_id: string, ownerName: string}
    ) {}
}
