export class PathConfig {

    //public static BASE_URL_API:string  = 'http://mlb-bts-service-qa-519372918.us-east-1.elb.amazonaws.com/';
    public static BASE_URL_API:string  = 'http://mlb-contest-admin-tool-qa-1217774198.us-east-1.elb.amazonaws.com/';


    public static LOGIN_AUTH :string = PathConfig.BASE_URL_API + 'bts/admin/login';
    public static GET_GAME_TYPE_LIST :string = PathConfig.BASE_URL_API + 'bts/showdown/getgametypelist';
    public static GET_SHOWDOWN_GAME :string   = PathConfig.BASE_URL_API + 'bts/showdown/getshowdown';

    public static GET_CONTESTS_LIST :string  = PathConfig.BASE_URL_API + 'bts/showdown/getcontests';
    public static CREATE_SHOWDOWN_CONTEST :string  = PathConfig.BASE_URL_API + 'bts/showdown/createshowdown';
    public static UPDATE_SHOWDOWN_CONTEST :string  = PathConfig.BASE_URL_API + 'bts/showdown/updateshowdown';

    public static GET_BTSIAD_CONTESTS_LIST :string  = PathConfig.BASE_URL_API + 'bts/showdown/getbtsiadcontests';
    public static CREATE_BTSIAD_CONTEST :string  = PathConfig.BASE_URL_API + 'bts/showdown/createbtsiad';
    public static UPDATE_BTSIAD_CONTEST :string  = PathConfig.BASE_URL_API + 'bts/showdown/updatebtsiad';

    public static UPLOAD_FILE_BY_URL:string = PathConfig.BASE_URL_API +'bts/preview/uploadfilebyurl';
    public static UPLOAD_FILE:string = PathConfig.BASE_URL_API +'bts/preview/uploadfile';

}
