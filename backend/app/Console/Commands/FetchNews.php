<?php

namespace App\Console\Commands;

use App\Http\Helpers\NewsAPIHelper;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;

class FetchNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news.fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news from data sources';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // News API
        $news_api = new NewsApi(env('NEWS_API_KEY'));
        $from_date = '2023-01-01T00:00:00';
        $to_date = Carbon::now()->toISOString();
        $page_size = 100;
        $page = 1;

        $last_news = News::where('datasource', 'NewsAPI')->orderBy('date', 'DESC')->first();
        if ($last_news) {
            $from_date = $last_news->date;
        }

        try {
            $news = $news_api->getEverything(
                null,
                null,
                null,
                null,
                $from_date,
                $to_date,
                null,
                null,
                $page_size,
                $page
            );

            NewsAPIHelper::handleFetch($news);

            if ($news->totalResults > $page_size) {
                for ($i = 2; $i < ceil($news->totalResults / $page_size); $i++) {
                    $news = $news_api->getEverything(
                        null,
                        null,
                        null,
                        null,
                        $from_date,
                        $to_date,
                        null,
                        null,
                        $page_size,
                        $i
                    );

                    NewsAPIHelper::handleFetch($news);
                }
            }
        } catch (\Exception $e) {}
        // News API

        return 0;
    }
}
