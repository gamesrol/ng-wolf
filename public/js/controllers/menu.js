app.controller('MenuController', function($scope, $cookieStore, $location, $window, $modal) {
	if(typeof($cookieStore.get('user')) != "undefined"){
		$scope.user = $cookieStore.get('user');

		$scope.logout = function(){
			$cookieStore.remove("user");
			$location.path("/");
			$window.location.reload();
		};
	}else{
		$scope.logg = function(log){
			modalCreatelog($modal, log);
		};
	}
});
