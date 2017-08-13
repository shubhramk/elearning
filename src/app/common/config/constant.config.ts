export class ConstantConfig {

  public static AUTH_TOKEN: string = "bts-contest-auth-token";
  public static USER_DETAIL:string = "bts-contest-user-detail";
  public static SHOW_LOADER: string = "SHOW_LOADER";
  public static SHOWDOWN_GAMETPYES_GROUPID:string = '2';
  public static BTSIAD_GAMETYPES_GROUPID:string = '1';

  public static SIDE_NAV: Array<Object> = [
    {
      "menu": "HOME",
      "menuID":"HOME",
      "path":'',
      "subMenu": [
        {"name": 'Scene 1', "path": 'home/scene1' , "routeID": 'HOME_1'},
        {"name": 'Scene 2', "path": 'home/scene2' , "routeID": 'HOME_2'}
       ]
    },
    {
      "menu": "QUESTION",
      "menuID":"QUESTION",
      "path":'home/question',
      "subMenu": []
    }
    ,
    {
      "menu": "INFO",
      "menuID":"INFO",
      "path":'home/info',
      "subMenu": []
    },
    {
      "menu": "BOOK A COURSE",
      "menuID":"BOOK_A_COURSE",
      "path":'home/book-a-course',
      "subMenu": []
    },
    {
      "menu": "FEEDBACK",
      "menuID":"FEEDBACK",
      "path":'home/feedback',
      "subMenu": []
    }
  ];
}

