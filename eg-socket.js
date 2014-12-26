$SocketFactory.$inject = ['$rootScope'];
function $SocketFactory($rootScope) {
  var socket = io.connect();
  var SocketFactory = {
    on: function on(eventName,callback) {
      socket.on(eventName,function(){
        var args = arguments;
        // This tells AngularJS that it needs to 
        // check the state of the application and 
        // update the templates if there was a 
        // change after running the callback passed to it.
        $rootScope.$apply(function(){
          callback.apply(socket,args);
        });
      });
    },
    emit: function emit(eventName,data,callback) {
      socket.emit(eventName,data,function(){
        var args = arguments;
        $rootScope.$apply(function(){
          if (callback) {
            callback.apply(socket,args);
          }
        });
      });
    }
  };
  return SocketFactory;
}

angular.module('egSocket',[])
  .factory('socket',$SocketFactory);
