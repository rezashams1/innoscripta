<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SnakeCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $json_array = $this->renameKeysSnake($request->all());
        $request->replace($json_array);

        return $next($request);
    }

    protected function renameKeysSnake($array) {
        $newArray = array();
        foreach($array as $key => $value) {
            if(is_string($key)) $key = Str::snake($key);
            if(is_array($value) || is_object($value)) $value = $this->renameKeysSnake($value);

            $newArray[$key] = $value;
        }
        return $newArray;
    }
}
