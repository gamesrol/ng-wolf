<?php

use Illuminate\Database\Capsule\Manager as Capsule;

/**
 * Personals Migrate
 */

class PersonalsMigration {
	function run()
	{
		Capsule::schema()->dropIfExists('personals');

		Capsule::schema()->create('personals', function($table) {
			$table->increments('id');
			$table->integer('candidate_id')->unique()->unsigned();
			$table->string('title');
			$table->string('name');
			$table->string('surname');
			$table->date('dateBirth');
			$table->integer('phoneNumber');
			$table->string('address');
			$table->string('postalCode');
			$table->string('city');
			$table->string('country');
			$table->text('summary');
			$table->string('linkedin');
			$table->timestamps();
			
			$table->foreign('candidate_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
		});
	}
}