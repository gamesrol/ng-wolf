<?php

/**
 * Personal Controller
 */

$app->group('/personals', function () use ($app) {
	$app->get('/', function () use ($app) {
		$results = [];
		$results['personals'] = Personal::all();

		$results["success"]= "true";

		echo json_encode($results);
	});

	$app->get('/show/:id', function ($id) use ($app) {
		$results = [];
		$results["personal"] = Personal::find($id);
		$results["success"]= "true";

		echo json_encode($results);
	});

	$app->post('/form', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$results = [];
		$results["success"]= "false";
		if (validatedKey($data['user'])) {
			if(isset($data['personal']['id'])){
				Personal::find($data['personal']['id'])->update($data['personal']);
			}else{
				Personal::create($data['personal']);
			}

			$results["success"]= "true";
			$results["value"]= "New";
		} else {
			$results["success"]= "false";
			$results["error"]= "No auth";
		}

		echo json_encode($results);
	});

	$app->post('/delete', function () use ($app) {
		$data = json_decode($app->request->getBody(), true);
		$results = [];
		$results["success"]= "false";

		if (validatedKey($data['user'])) {
			$personal = Personal::find($data['personal']['id']);
			$personal->delete();
			$results["personals"] = Personal::all();
			$results["success"]= "true";
			$results["value"]= "delete";
		} else {
			$results["success"]= "false";
			$results["error"]= "No auth";
		}

		echo json_encode($results);
	});
});
