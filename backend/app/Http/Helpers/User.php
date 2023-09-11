<?php

namespace App\Http\Helpers;

class User {
    static function render($user) {
        $result = new \stdClass();
        $result->name = $user->name;
        $result->email = $user->email;
        $result->sources = [];

        foreach($user->sources as $source) {
            $the_source = new \stdClass();
            $the_source->id = $source->source->id;
            $the_source->title = $source->source->title;

            $result->sources[] = $the_source;
        }

        $result->authors = [];

        foreach($user->authors as $author) {
            $the_author = new \stdClass();
            $the_author->id = $author->author->id;
            $the_author->title = $author->author->title;

            $result->authors[] = $the_author;
        }

        return $result;
    }
}