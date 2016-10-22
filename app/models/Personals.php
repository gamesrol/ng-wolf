<?php

/**
 * Personal Model
 */

class Personal extends \Illuminate\Database\Eloquent\Model
{
	protected $table = "personals";
	protected $fillable = ['candidate_id','title','name','surname','dateBirth','phoneNumber','address','postalCode','city','country','summary','linkedin'];
}