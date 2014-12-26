$SocketFactory.$inject = ['$rootScope'];
function $SocketFactory($rootScope) {
  var socket = io.connect();
  socket.on('broadcast:all',function(data){
    $rootScope.$broadcast('broadcast:all',{data:data});
  });
  var SocketFactory = function() {};
  SocketFactory.prototype.broadcast = function(data) {
    socket.emit('broadcast:all',{data:data});
  };
  return SocketFactory;
}

angular.module('eg.socket',[])
  .factory('SocketFactory',$SocketFactory);
