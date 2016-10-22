/* En esta sección se encuentra la función que controla los modals */
function modalCreate($modal, type, title, body ){
	var modalInstance = $modal.open({
      	templateUrl: 'partials/modal/main.html',
	  	controller: 'ModalController',
	  	size: 'md',
      	resolve: {
        	modal: function () {
          		return {type: type, title: title, body: body};
        	}
		}
    });
    return modalInstance;
}

function modalCreatelog($modal, logg ){
	var modalInstance = $modal.open({
      	templateUrl: 'partials/user/main.html',
	  	controller: 'UserController',
	  	size: 'md',
      	resolve: {
        	modal: function () {
          		return {logg: logg};
        	}
		}
    });
    return modalInstance;
}

function size(){
	$('#main-container').css("min-height", ($(window).height()-$('footer').height())+"px");
}

/* Esta función actualmente no está en uso pero puede ser utilizada para enlazar a un objeto DOM */
function goTo(position){
	$('html, body').animate({ 
		scrollTop: $('#'+position).offset().top
	}, 1500);
	setTimeout(function(){
		$('html, body').animate({ 
			scrollTop: $('#'+position).offset().top
		}, 500);
	}, 1600);
}


/*  En esta sección se encuentran funciones para controlar el "scroll" y el "resize" en el navegador */
$( document ).ready(function() {
	size();
	$( window ).resize(function() {
		size();
	});
	$(window).scroll(function(){
		size();
	});
});

app.directive("closedmenu", function () {
	return function(scope, element, attrs) {
		angular.element(element).bind("click", function() {
			if($('#btn-info').attr('aria-expanded') !='false'){
				$("#btn-info").trigger( "click" );
			}
			if($('#btn-app').attr('aria-expanded') !='false'){
				$("#btn-app").trigger( "click" );
			}
		});
	};
});

$(function() {
    $('#navbar .nav a').on('click', function(){ 
        if($('#btn-info').css('display') !='none'){
            $("#btn-info").trigger( "click" );
        }
    });
    // $('#navbar-bottom .nav a').on('click', function(){ 
    //     if($('#btn-app').css('display') !='none'){
    //         $("#btn-app").trigger( "click" );
    //     }
    // });
});