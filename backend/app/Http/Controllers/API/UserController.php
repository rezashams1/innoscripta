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
        if(empty($request->type)) {
            $this->api_response['errors']['type'] = 'Please enter preference type';
        } else {
            if (!in_array($request->type, ['source', 'category', 'author'])) {
                $this->api_response['errors']['type'] = 'Entered preference type is not valid';
            }
        }

        if(empty($request->values)) {
            $this->api_response['errors']['values'] = 'Please enter your preferences';
        }

        if(!$this->hasApiError()) {
            $user = Auth::guard('api')->user();

            if ($request->type == 'source') {
                $user->sources()->delete();

                foreach ($request->values as $id) {
                    $check_source = Source::find($id);

                    if ($check_source) {
                        $preference = new UserPreferredSource();
                        $preference->user_id = $user->id;
                        $preference->source_id = $id;
                        $preference->save();
                    }
                }
            }

            if ($request->type == 'category') {
                $user->categories()->delete();

                foreach ($request->values as $id) {
                    $check_category = Category::find($id);

                    if ($check_category) {
                        $preference = new UserPreferredCategory();
                        $preference->user_id = $user->id;
                        $preference->category_id = $id;
                        $preference->save();
                    }
                }
            }

            if ($request->type == 'author') {
                $user->authors()->delete();

                foreach ($request->values as $id) {
                    $check_author = Author::find($id);

                    if ($check_author) {
                        $preference = new UserPreferredAuthor();
                        $preference->user_id = $user->id;
                        $preference->author_id = $id;
                        $preference->save();
                    }
                }
            }

            $this->api_response['message'] = 'Preference saved successfully.';
        }

        return $this->makeApiResponse();
    }
}
