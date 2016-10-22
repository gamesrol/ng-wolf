app.controller('PersonalFormController', function($scope, $cookieStore, $http, $location, $routeParams, $modal, Upload) {
	if( typeof($cookieStore.get('user')) != "undefined" ){
		$scope.user = $cookieStore.get('user');	
		if($routeParams.id){
			$http({
				method: 'GET',
				url: serverURL+"/personals/show/"+$routeParams.id,
				data: {
					user: $scope.user
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			}).success(function(data, status, headers, config) {

				if(data.success == "true"){
					$scope.personal = data.personal;
				}else{
					modal = modalCreate($modal,"danger", "Error", "It has successfully made the connection but something went wrong");
				}
			}).error(function(data, status, headers, config) {
				modal = modalCreate($modal,"danger", "Error", "Not connected with server.");
			});
		}

		$scope.createPersonal = function (personal) {
			$http({
				method: 'POST',
				url: serverURL+"/personals/form",
				data: {
					personal: personal,
					user: $scope.user
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			}).success(function(data, status, headers, config) {
				if(data.success == "true"){
					$location.path( "/personals" );
				}else{
					modal = modalCreate($modal,"danger", "Error", "It has successfully made the connection but something went wrong");
				}
			}).error(function(data, status, headers, config) {
				modal = modalCreate($modal,"danger", "Error", "Not connected with server.");
			});
		};
		
		// upload on file select or drop
		$scope.upload = function (file) {
			if (file && !file.$error) {
				Upload.upload({
					url: serverURL+"/user/photo",
					data: {'user': $scope.user},
					file: file
				}).progress(function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					$scope.progressPercentage = progressPercentage;
				}).success(function (data, status, headers, config) {
					$scope.user.img = data.img;
					$cookieStore.put('user', $scope.user);
					$scope.progressPercentage = 0;
				}).error(function (data, status, headers, config) {
					modal = modalCreate($modal,"danger", "Error", "Error to upload an image.");
				})
			}
		};
	}
});
