<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\UserPreferredAuthor;
use App\Models\UserPreferredCategory;
use App\Models\UserPreferredSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    function saveOrDeletePreferences(Request $request) {
        $user = Auth::guard('api')->user();

        $user->sources()->delete();
        foreach ($request->sources ?? [] as $id) {
            $check_source = Source::find($id);

            if ($check_source) {
                $preference = new UserPreferredSource();
                $preference->user_id = $user->id;
                $preference->source_id = $id;
                $preference->save();
            }
        }

        $user->categories()->delete();
        foreach ($request->categories ?? [] as $id) {
            $check_category = Category::find($id);

            if ($check_category) {
                $preference = new UserPreferredCategory();
                $preference->user_id = $user->id;
                $preference->category_id = $id;
                $preference->save();
            }
        }

        $user->authors()->delete();
        foreach ($request->authors ?? [] as $id) {
            $check_author = Author::find($id);

            if ($check_author) {
                $preference = new UserPreferredAuthor();
                $preference->user_id = $user->id;
                $preference->author_id = $id;
                $preference->save();
            }
        }

        $this->api_response['message'] = 'Preferences saved successfully.';

        return $this->makeApiResponse();
    }
}
