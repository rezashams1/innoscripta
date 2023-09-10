<?php

namespace App\Console\Commands;

use App\Http\Helpers\NewsApi as NewsApiHelper;
use App\Http\Helpers\TheGuardian as TheGuardianHelper;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;
use Illuminate\Support\Facades\Http;

class FetchNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch';

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
        $from_date = Carbon::create(2023, 9, 1)->toIso8601String();
        $to_date = Carbon::now()->toIso8601String();
        $page_size = 100;
        $page = 1;

        // News API
        $last_news = News::where('datasource', 'NewsAPI')->orderBy('date', 'DESC')->first();
        if ($last_news) {
            $from_date = $last_news->date;
        }

        try {
            $news_api = new NewsApi(env('NEWS_API_KEY'));

            $news = $news_api->getEverything(
                'football',
                null,
                null,
                null,
                $from_date,
                $to_date,
                'en',
                null,
                $page_size,
                $page
            );

            NewsApiHelper::handleFetch($news);

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

                    NewsApiHelper::handleFetch($news);
                }
            }
        } catch (\Exception $e) {
            print_r($e);
        }
        // News API

        // The Guardian
        $from_date = Carbon::create(2023, 9)->toIso8601String();

        $last_news = News::where('datasource', 'TheGuardian')->orderBy('date', 'DESC')->first();
        if ($last_news) {
            $from_date = Carbon::parse($last_news->date)->toIso8601String();
        }

        try {
            $news = TheGuardianHelper::get(1, $from_date, $to_date);

            TheGuardianHelper::handleFetch($news->response);

            if ($news->response->pages > 50) {
                for ($i = 2; $i < ceil($news->response->pages / 50); $i++) {
                    $news = TheGuardianHelper::get($i, $from_date, $to_date);
                    TheGuardianHelper::handleFetch($news->response);
                }
            }
        } catch (\Exception $e) {
            print_r($e);
        }
        // The Guardian

        return 0;
    }
}
