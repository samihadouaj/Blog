export class UserModel {
    constructor( public name: string , public email: string , public  password: string,
         public id ?: string,
        public  inscriptionDate ?,
       public posts ?: string[],
       public likedPosts ?: string[],
        public comments ?: string[],
        public image?: string
) {}


}
