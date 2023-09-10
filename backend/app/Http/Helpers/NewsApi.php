<?php

namespace App\Http\Helpers;

use App\Models\Author;
use App\Models\News;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class NewsApi {
    static function handleFetch($data) {
        for($i = 0; $i < count($data->articles); $i++) {
            // Check the source
            $source = Source::where('related_id', $data->articles[$i]->source->id)->where('title', $data->articles[$i]->source->name)->first();

            if (!$source) {
                $source = new Source();
                $source->related_id = $data->articles[$i]->source->id;
                $source->title = $data->articles[$i]->source->name;
                $source->save();
            }

            // Check the author
            $author = Author::where('title', $data->articles[$i]->author ?? 'No Name')->first();

            if (!$author) {
                $author = new Author();
                $author->title = $data->articles[$i]->author ?? 'No Name';
                $author->save();
            }

            $news = new News();
            $news->datasource = 'NewsAPI';
            $news->source_id = $source->id;
            $news->author_id = $author->id;
            $news->title = $data->articles[$i]->title;
            $news->description = $data->articles[$i]->description;
            $news->content = $data->articles[$i]->content;
            $news->date = Carbon::parse($data->articles[$i]->publishedAt);
            $news->save();
        }
    }
}
