export class ConstantConfig {

  public static AUTH_TOKEN: string = "bts-contest-auth-token";
  public static USER_DETAIL:string = "bts-contest-user-detail";
  public static SHOW_LOADER: string = "SHOW_LOADER";
  public static SHOWDOWN_GAMETPYES_GROUPID:string = '2';
  public static BTSIAD_GAMETYPES_GROUPID:string = '1';

  public static SIDE_NAV: Array<Object> = [
    {
      "menu": "Showdown",
      "menuID":"SHOWDOWN",
      "iconClass": 'fa-tags',
      "subMenu": [
        {"name": 'All Contest', "path": 'showdown-contest/list' , "routeID": 'SHOWDOWN_1'},
        {"name": 'Create Contest', "path": 'showdown-contest/add',"routeID": 'SHOWDOWN_2'}
       ]
    },
    {
      "menu": "BTSIAD",
      "menuID":"BTSIAD",
      "iconClass": 'fa-tasks',
      "subMenu": [
        {"name": 'All Contest', "path": 'btsiad/list' , "routeID": 'BTSIAD_1'},
        {"name": 'Create Contest', "path": 'btsiad/add',"routeID": 'BTSIAD_2'}
      ]
    }
    ,
    {
      "menu": "Preview",
      "menuID":"PREVIEW",
      "iconClass": 'fa-address-card-o',
      "subMenu": [
        {"name": 'Preview', "path": 'preview/add' ,"routeID": 'PREVIEW_1'}
      ]
    }
  ];
}

