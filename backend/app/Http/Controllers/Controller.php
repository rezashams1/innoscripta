<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $api_response = ['errors' => [], 'message' => '', 'data' => []];
    public $api_cookies = [];

    function hasApiError() {
        return count($this->api_response['errors']) != 0;
    }

    function makeApiResponse() {
        $status_code = 200;
        if (count($this->api_response['errors']) != 0) {
            $status_code = 400;
        }

        // camelCase response data
        if(is_object($this->api_response['data'])) {
            $this->api_response['data'] = (array) $this->api_response['data'];
        }
        $this->api_response['data'] = $this->renameKeysCamel($this->api_response['data']);

        // camelCase response error
        if(is_object($this->api_response['errors'])) {
            $this->api_response['errors'] = (array) $this->api_response['errors'];
        }
        $this->api_response['errors'] = $this->renameKeysCamel($this->api_response['errors']);

        // set cookies
        $responseObj = response()->setStatusCode($status_code)->json($this->api_response);

        if(count($this->api_cookies) != 0) {
            foreach ($this->api_cookies as $cookie) {
                $responseObj = $responseObj->cookie(
                    $cookie['name'],
                    $cookie['value'],
                    $cookie['duration'] ?? 0,
                    $cookie['path'] ?? null,
                    $cookie['domain'] ?? null,
                    $cookie['secure'] ?? null,
                    $cookie['httpOnly'] ?? false,
                    $cookie['raw'] ?? true,
                    $cookie['sameSite'] ?? null
                );
            }
        }

        // send response
        return $responseObj;
    }

    function renameKeysCamel($array) {
        $newArray = array();

        foreach($array as $key => $value) {
            if(is_string($key)) $key = Str::camel($key);
            if(is_array($value) || is_object($value)) $value = static::renameKeysCamel($value);
            $newArray[$key] = $value;
        }

        return $newArray;
    }
}
