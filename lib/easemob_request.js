
var request         = require( 'request' );
var app_const       = require( './const');


exports.init = function( org_name, app_name, client_id, client_secret){
  app_const.ORG_NAME      = org_name;
  app_const.APP_NAME      = app_name;
  app_const.CLIENT_ID     = client_id;
  app_const.CLIENT_SECRET = client_secret;
}




//通用http请求函数
var request_json = function (data, path, method, callback) {
    var options = {
        url: app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
        method : method ,
        json: data
    };
    request(options,callback);
};

//获取token
exports.get_token = function (callback) {
  var data = {grant_type: 'client_credentials', client_id: app_const.CLIENT_ID , client_secret: app_const.CLIENT_SECRET};
  request_json(data, '/token', 'POST', function (err,res,body) {
//    console.log(res);
    if (!err & body && body.access_token){
      callback(null,body.access_token);
    }else{
      callback(err,res);
    }
  });
};


//通用http请求函数
exports.request_token = function (data, path, method,headers, callback) {

  if(!headers){
    headers = {};
  }
  headers.Authorization = 'Bearer ' + app_const.TOKEN;
  var options = {
    url     : app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
    method  : method ,
    headers : headers ,
    json    : data
  };
//  console.log(app_const.token);
//  console.log(headers);
  request(options,callback);
};


