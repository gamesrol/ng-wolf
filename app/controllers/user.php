<?php

$app->group('/user', function () use ($app) {

	$app->get('/', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$results = [];
		$results["user"] = [];
		$results["success"]= "false";

		if (validatedKey($data["user"]["id"], $data["user"]["key"])) {
			$user = user::where('id', '=', $data["user"]["id"])->first();
			$results["user"] = $user;

			$results["success"]= "true";
		} else {
			$results["success"]= "false";
			$results["error"]= "No auth";
		}
		echo json_encode($results);
	});
	
	$app->post('/photo', function () use ($app) {
		$data = json_decode($_POST['data'], true);
		$results = [];
		$results["success"]= "false";
		if (validatedKey($data['user'])) {
			if($_FILES['file']['name'] != ""){ // El campo foto contiene una imagen...
		
				// Primero, hay que validar que se trata de un JPG/GIF/PNG
				$allowedExts = array("jpg", "jpeg", "gif", "png", "JPG", "GIF", "PNG");
				$ext = end(explode(".", $_FILES["file"]["name"]));
				if ((($_FILES["file"]["type"] == "image/gif")
					|| ($_FILES["file"]["type"] == "image/jpeg")
					|| ($_FILES["file"]["type"] == "image/png")
					|| ($_FILES["file"]["type"] == "image/pjpeg"))
					&& in_array($ext, $allowedExts)) {
				
					$ext = end(explode('.', $_FILES['file']['name']));
					$photo = substr(md5(uniqid(rand())),0,10).".".$ext;
					$dir = dirname(__FILE__).'/../../public/img/users'; // directorio de tu elección
					if(move_uploaded_file($_FILES['file']['tmp_name'], $dir.'/'.$photo)){
						$user = User::find($data['user']['id']);
						$user->img = "img/users/".$photo;
						$user->save();
						$img = new Imagick($dir.'/'.$photo);
						$img->cropThumbnailImage(50, 50);
						$img->writeImage ($dir.'/'.$photo);
						$results['img'] = "img/users/".$photo;
						$results["success"]= "true";
					}

				} else { 
					$results["error"]= "Invalid format";
				}
			} else {
				$results["error"]= "Not exist file";
			}
		} else {
			$results["success"]= "false";
			$results["error"]= "No auth";
		}
		echo json_encode($results);
	});

	$app->post('/new', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$results = [];
		$results["success"]= "false";

		if(!User::where('email', '=', $data["user"]["email"])->exists()){
			$user = new User();
			$user->email = $data["user"]["email"];
			$user->password = hash('sha512',$data["user"]["password"]);
			$user->save();
			$encriptedKey = hash('sha512', $user->id.$user->email.$user->created_at);
			$results["id"] = $user->id;
			$results["email"] = $user->email;
			$results["isAdmin"] = $user->isAdmin;
			$results["key"] = $encriptedKey;
			$results["success"]= "true";
		}
		echo json_encode($results);
	});

	$app->post('/login', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$results = [];
		$results["success"]= "false";
	
		$veri = User::where('email', '=', $data['user']['email'])->where('email', '=', $data['user']['email'])->where('password', '=', hash('sha512', $data['user']['password']))->first();
		if(User::where('email', '=', $data['user']['email'])->where('password', '=', hash('sha512', $data['user']['password']))->exists()){
			$results["id"] = $veri->id;
			$results["email"] = $veri->email;
			$results["isAdmin"] = $veri->isAdmin;
			$results["key"] = hash('sha512', $veri->id.$veri->email.$veri->created_at);
			$results["success"]= "true";
		}
	
		echo json_encode($results);
	});

	$app->get('/list', function () use ($app) {
		$users = User::all();
		$results["users"] = $users;
		echo json_encode($results);
	});
	
	$app->post('/social', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);
		$pass = hash('sha512', $data['social']."-".$data['user']['email']."-".hash('sha512', $data['user']['name']));
		$results = [];
		$results["success"]= "false";
		if($data['social'] =="twitter"){
			$data["user"]["email"] = "@".$data["user"]["alias"];
		}

		$query = User::where('email', '=', $data["user"]["email"])->where('password', '=', $pass);
		//print_s($pass);
		if($query->exists()){
			$user = $query->first();
		}else{
			$user = new User();
			$user->email = $data["user"]["email"];
			$user->password = $pass;
			$user->img = $data["user"]["avatar"];
			$user->social = $data["social"];
			$user->save();
		}
		
		$encriptedKey = hash('sha512', $user->id.$user->email.$user->created_at);
		
		$results["id"] = $user->id;
		$results["email"] = $user->email;
		$results["isAdmin"] = $user->isAdmin;
		$results["img"] = $user->img;
		$results["social"] = $user->social;
		$results["key"] = $encriptedKey;
		$results["success"]= "true";

		echo json_encode($results);
	});
});
