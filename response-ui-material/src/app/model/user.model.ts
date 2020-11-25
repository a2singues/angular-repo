export interface UserModel {

         id : String,
         nickname: String,
         password: String,
         fName : String,
         lastName ?: String,
         gender ?: number,
         address ?: String,
         email ?: String,
         birthDate ?: Date
     }