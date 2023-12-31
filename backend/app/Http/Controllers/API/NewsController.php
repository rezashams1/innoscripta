<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller {
    function findAll(Request $request) {
        // Should get personalized
        $type = 'all';
        if (!empty($request->type) && $request->type == 'personalized') {
            $type = $request->type;
        }

        // The user
        if ($type == 'personalized') {
            if (!Auth::guard('api')->check()) {
                $this->api_response['errors']['authentication'] = 'You are not authorized';
            }
        }

        if(!$this->hasApiError()) {
            $user = Auth::guard('api')->user();

            // Keyword search
            $q = $request->q ?? '';
    
            // Sources filter
            $sources = [];
            if ($type == 'all') {
                if (!empty($request->sources)) {
                    $sources = array_filter(explode($request->sources, ','));
                }
            } else {
                $sources = $user->sources->pluck('source_id');
            }
    
            // Authors filter
            $authors = [];
            if ($type == 'all') {
                if (!empty($request->authors)) {
                    $authors = array_filter(explode($request->authors, ','));
                }
            } else {
                $authors = $user->authors->pluck('author_id');
            }
    
    
            // Categories filter
            $categories = [];
            if ($type == 'all') {
                if (!empty($request->categories)) {
                    $categories = array_filter(explode($request->categories, ','));
                }
            } else {
                $categories = $user->categories->pluck('category_id');
            }
    
            // Order filter
            $date_order = 'DESC';
            if (!empty($request->order) && $request->order == 'asc') {
                $date_order = 'ASC';
            }
    
            // Pagination
            $skip = $request->skip ?? 0;
    
            // Initialize query
            $news = News::query();
    
            // Search by keyword
            if (!empty($q)) {
                $news = $news->where(function ($query) use ($q) {
                    $query->where('title', 'LIKE', '%'.$q.'%')->orWhere('description', 'LIKE', '%'.$q.'%')->orWhere('content', 'LIKE', '%'.$q.'%');
                });
            }
    
            // Filter by sources
            if (count($sources) > 0) {
                $news = $news->whereIn('source_id', $sources);
            }
    
            // Filter by authors
            if (count($authors) > 0) {
                $news = $news->whereIn('author_id', $authors);
            }
    
            // Filter by categories
            if (count($categories) > 0) {
                $news = $news->whereHas('categories', function ($query) use ($categories) {
                    $query->whereIn('category_id', $categories);
                });
            }
    
            // Get the results
            $news = $news->with(['source', 'author', 'categories.category'])->orderBy('date', $date_order)->skip($skip)->take(20)->get()->toJson();
    
            $this->api_response['data']['news'] = json_decode($news);
        }

        return $this->makeApiResponse();
    }

    function categories()
    {
        $this->api_response['data']['categories'] = json_decode(Category::all()->toJson());

        return $this->makeApiResponse();
    }

    function sources(Request $request)
    {
        $sources = Source::query();

        if ($request->q) {
            $sources = $sources->where('title', 'LIKE', '%' . $request->q . '%');
        }

        $this->api_response['data']['sources'] = json_decode($sources->get()->toJson());

        return $this->makeApiResponse();
    }

    function authors(Request $request)
    {
        $authors = Author::query();

        if ($request->q) {
            $authors = $authors->where('title', 'LIKE', '%' . $request->q . '%');
        }

        $this->api_response['data']['authors'] = json_decode($authors->get()->toJson());

        return $this->makeApiResponse();
    }
}
