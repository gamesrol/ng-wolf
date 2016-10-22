app.controller('PersonalController', function($scope, $cookieStore, $http, $filter, $modal) {
	if(typeof($cookieStore.get('user')) != "undefined"){
		$scope.user = $cookieStore.get('user');
	}

	$http({
		method: 'GET',
		url: serverURL+"/personals/",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).success(function(data, status, headers, config) {
		if(data.success == "true"){
			$scope.list = data.personals;
		}else{
			modal = modalCreate($modal,"danger", "Error", "It has successfully made the connection but something went wrong");
		}
	}).error(function(data, status, headers, config) {
		modal = modalCreate($modal,"danger", "Error", "Not connected with server.");
	});

	$scope.removePersonal = function(personal){
		var basket = $cookieStore.get('basket');
		$http({
			method: 'POST',
			url: serverURL+"/personals/delete",
			data: {
				personal: personal,
				user: $scope.user
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).success(function(data, status, headers, config) {
			if(data.success == "true"){
				var index = $scope.list.indexOf(personal)
				$scope.list.splice(index, 1);
			}else{
				modal = modalCreate($modal,"danger", "Error", "It has successfully made the connection but something went wrong");
			}
		}).error(function(data, status, headers, config) {
			modal = modalCreate($modal,"danger", "Error", "Not connected with server.");
		});
	};
});
