app.controller('HomeController', function($scope, $document, $interval) {
    $scope.camara = angular.element('#carousel');
    $scope.play = true;
    $scope.pika = -190;
    $scope.t = {
        x: 30,
        y: 16,
        z: 455
    }
    $scope.r = {
        x: 0,
        y: 0,
        z: 0
    }
    var move = function(e){
        if (e.keyCode == 38) {
            $scope.t.z = $scope.t.z + 2;
        }
        if (e.keyCode == 40) {
            $scope.t.z = $scope.t.z - 2;
        }

        if (e.keyCode == 37) {
            $scope.t.x = $scope.t.x + 2;
        }
        if (e.keyCode == 39) {
            $scope.t.x = $scope.t.x - 2;
        }

        if (e.keyCode == 65) {
            $scope.t.y = $scope.t.y + 2;
        }
        if (e.keyCode == 90) {
            $scope.t.y = $scope.t.y - 2;
        }
        
        if (e.keyCode == 81) {
            $scope.r.y = $scope.r.y + 2;
        }
        if (e.keyCode == 87) {
            $scope.r.y = $scope.r.y - 2;
        }
    };
    
    $document.on('keydown', move);
    
    $scope.playStop = function(){
        if($scope.play == false){
            $scope.play = true;
        }else{
            $scope.play = false;
        }
        
    }
    $interval( function(){ 
        if($scope.play == true){
            if($scope.t.z<1000){
                $scope.t.z = $scope.t.z+1;
            }else{
                $scope.t.z = 455;
            }
            if($scope.pika < 300){
               $scope.pika = $scope.pika + 10;
            }else{
                $scope.pika = -190
            }
        }
    }, 50);
});

/*
            var konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konami_index = 0;
            var handler = function(e) {
                if (e.keyCode === konami_keys[konami_index++]) {
                    if (konami_index === konami_keys.length) {
//                      $document.off('keydown', handler);
                        modal = modalCreate($modal,"konami", "We are very sorry.", "We are really sorry but we are still developing the system to increase the number of lifes.");
                        scope.$apply(scope.konami);
                    }
                } else {
                    konami_index = 0;
                }
            };
*/