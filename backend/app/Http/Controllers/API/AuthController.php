<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Helpers\User as UserHelper;

class AuthController extends Controller {
    function login(Request $request) {
        if(empty($request->email)) {
            $this->api_response['errors']['email'] = 'Please enter your email address';
        }
        if(empty($request->password)) {
            $this->api_response['errors']['email'] = 'Please enter your password';
        }

        if(!$this->hasApiError()) {
            $user = User::where('email', $request->email)->with('sources.source', 'authors.author')->first();

            if($user == NULL) {
                $this->api_response['errors']['email'] = 'Entered credentials are not valid';
                $this->api_response['errors']['password'] = 'Entered credentials are not valid';
            } else {
                if (!Hash::check($request->password, $user->password)) {
                    $this->api_response['errors']['email'] = 'Entered credentials are not valid';
                    $this->api_response['errors']['password'] = 'Entered credentials are not valid';
                } else {
                    $token_result = $user->createToken('access_token');
                    $token = $token_result->token;
                    $token->save();

                    $access_token = $token_result->accessToken;

                    $this->api_response['data']['accessToken'] = $access_token;
                    $this->api_response['data']['tokenType'] = 'Bearer';
                    $this->api_response['data']['expiresAt'] = Carbon::parse($token->expires_at)->toDateTimeString();
                    $this->api_response['data']['user'] = UserHelper::render($user);

                    $this->api_cookies = [
                        [
                            'name' => 'access_token',
                            'value' => $access_token,
                            'duration' => Carbon::now()->diffInMinutes(Carbon::make($token->expires_at)),
                            'secure' => true,
                            'httpOnly' => true,
                            'sameSite' => 'none'
                        ]
                    ];

                    $this->api_response['message'] = 'Logged in successfully.';
                }
            }
        }

        return $this->makeApiResponse();
    }

    function register(Request $request) {
        if(empty($request->name)) {
            $this->api_response['errors']['name'] = 'Please enter your name';
        }
        if(empty($request->email)) {
            $this->api_response['errors']['email'] = 'Please enter your email address';
        } else {
            if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
                $this->api_response['errors']['email'] = "Entered email address is not valid";
            }
        }
        if(empty($request->password)) {
            $this->api_response['errors']['password'] = 'Please enter a password';
        }

        if(!$this->hasApiError()) {
            $check_email = User::where('email', $request->email)->first();

            if($check_email != NULL) {
                $this->api_response['errors']['email'] = 'Entered email address has been used before';
            } else {
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();

                $token_result = $user->createToken('access_token');
                $token = $token_result->token;
                $token->save();

                $access_token = $token_result->accessToken;

                $this->api_response['data']['accessToken'] = $access_token;
                $this->api_response['data']['tokenType'] = 'Bearer';
                $this->api_response['data']['expiresAt'] = Carbon::parse($token->expires_at)->toDateTimeString();
                $this->api_response['data']['user'] = UserHelper::render($user);

                $this->api_cookies = [
                    [
                        'name' => 'access_token',
                        'value' => $access_token,
                        'duration' => Carbon::now()->diffInMinutes(Carbon::make($token->expires_at)),
                        'secure' => true,
                        'httpOnly' => true,
                        'sameSite' => 'none'
                    ]
                ];

                $this->api_response['message'] = 'Registration done successfully.';
            }
        }

        return $this->makeApiResponse();
    }

    function auth() {
        if (Auth::guard('api')->check()) {
            if (Carbon::parse(Auth::guard('api')->user()->token()->expires_at)->timestamp < Carbon::now()->timestamp) {
                Auth::guard('api')->user()->token()->revoke();
                $this->api_response['errors']['invalid'] = "Session has expired";
            }
        } else {
            $this->api_response['errors']['invalid'] = "Session has expired";
        }

        if(!$this->hasApiError()) {
            $user = User::where('id', Auth::guard('api')->user()->id)->with('sources.source', 'authors.author')->first();

            $this->api_response['message'] = "Authenticated successfully.";
            $this->api_response['data']['user'] = UserHelper::render($user);
        }

        return $this->makeApiResponse();
    }
}
