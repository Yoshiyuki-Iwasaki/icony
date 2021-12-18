<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['bail','required', 'string', 'email', 'max:255'],
            'password' => ['bail','required', 'string', 'min:8'],
        ];
    }

    public function failedValidation( Validator $validator ){
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException( response()->json( $response, 422 ));
    }
}
