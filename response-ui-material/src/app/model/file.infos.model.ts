export interface FileInfosModel {

         id : String,
         name ?: String,
         url ?: String,
         selected ?: boolean, //--- true=selected as default
         status : number, //--- 0: valid, 1: to remove
         updateDate ?: Date
     }