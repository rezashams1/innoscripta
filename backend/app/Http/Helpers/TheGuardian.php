<?php

namespace App\Http\Helpers;

use App\Models\Author;
use App\Models\News;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class TheGuardian {
    static function get($page, $from, $to) {
        $response = Http::withHeaders([
            'api-key' => env('THE_GUARDIAN_API_KEY')
        ])->get('https://content.guardianapis.com/search', [
            'from-date' => $from,
            'to-date' => $to,
            'page-size' => 50,
            'page' => $page,
            'order-by' => 'oldest',
            'show-fields' => 'all',
        ]);

        return json_decode(json_encode($response->json()));
    }

    static function handleFetch($data) {
        for($i = 0; $i < count($data->results); $i++) {
            // Check the source
            $source = Source::where('related_id', str_replace(' ', '-', $data->results[$i]->fields->publication))->where('title', $data->results[$i]->fields->publication)->first();

            if (!$source) {
                $source = new Source();
                $source->related_id = str_replace(' ', '-', $data->results[$i]->fields->publication);
                $source->title = $data->results[$i]->fields->publication;
                $source->save();
            }

            // Check the author
            $author = Author::where('title', $data->results[$i]->fields->publication)->first();

            if (!$author) {
                $author = new Author();
                $author->title = $data->results[$i]->fields->publication;
                $author->save();
            }

            $news = new News();
            $news->datasource = 'TheGuardian';
            $news->source_id = $source->id;
            $news->author_id = $author->id;
            $news->title = $data->results[$i]->fields->headline;
            $news->description = $data->results[$i]->fields->trailText;
            $news->content = $data->results[$i]->fields->bodyText;
            $news->date = Carbon::parse($data->results[$i]->webPublicationDate);
            $news->save();
        }
    }
}
