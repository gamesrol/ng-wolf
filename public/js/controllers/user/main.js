app.controller('UserController', function($scope, $http, $cookieStore, $modal, $modalInstance, $window, modal) {
	$scope.logg = modal.logg;

	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.registerUser = function(register){
		$http({
			method: 'POST',
			url: serverURL+"/user/new",
			data: {
				user: register
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).success(function(data, status, headers, config) {
			if(data.success == "true"){
				$cookieStore.put('user',data);
				$window.location.reload();
			}else{
				modal = modalCreate($modal,"danger", "Error", "Email already in use.");
			}
		}).error(function(data, status, headers, config) {
			modal = modalCreate($modal,"danger", "Error", "Don't connected with server.");
		});
	};

	$scope.loginUser = function(login){
		$http({
			method: 'POST',
			url: serverURL+"/user/login",
			data: {
					user: login
				},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).success(function(data, status, headers, config) {
			if(data.success == "true"){
				$cookieStore.put('user',data);
				$window.location.reload();
			}else{
				modal = modalCreate($modal,"danger", "Error", "Invalid email or password.");
			}
		}).error(function(data, status, headers, config) {
			modal = modalCreate($modal,"danger", "Error", "Don't connected with server.");
		});
	};

	OAuth.initialize('YHWU5IeupujOH-Izgk6Wc9V3b5w'); // Yo

	$scope.clickConnect = function(provider) {
		
	    OAuth.popup(provider).done(function(result) {
	        //Get your user's personal data
	        
	        result.me().done(function(me) {
	        	var user = {};
	        	if(provider == "facebook"){
	        		result.get('me?fields=email').done(function(data) {
		        		var profile = me;
		        		profile.email = data.email;
		        		$scope.getSocialLogin(profile, provider);
		        	});
	        	}else if("google"){
	        		$scope.getSocialLogin(me, provider);
	        	}else if("twitter"){
	        		$scope.getSocialLogin(me, provider);
	        	}
    			$scope.me = me;
        		$scope.provider = provider;
        	});
	    })
	};

	$scope.getSocialLogin = function(data, provider){
		$http({
			method: 'POST',
			url: serverURL+"/user/social",
			data: {
					user: data,
					social: provider
				},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).success(function(data, status, headers, config) {
			if(data.success == "true"){
				$cookieStore.put('user',data);
				$window.location.reload();
			}else{
				modal = modalCreate($modal,"danger", "Error", "Invalid email or password.");
			}
		}).error(function(data, status, headers, config) {
			modal = modalCreate($modal,"danger", "Error", "Don't connected with server.");
		})
	};
})