<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(
            [
                'data' => User::get(),
                'success' => true
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [];

        $message = '';

        try {
            $user = new User();

            $postData = $request->except('id', '_method');

            $postData['password'] = bcrypt('test');

            $user->fill($postData);

            $success = $user->save();

            $data = $user;
        } catch (\Exception $e) {
            $message = $e->getMessage();

            $success = false;
        }

        return compact('data', 'message', 'success');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            return response()->json(
                [
                    'data' => User::findOrFail($id),
                    'success' => true
                ]
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'data' => [],
                    'success' => false,
                    'message' => $e->getMessage()
                ]
            );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = [];

        $message = '';

        try {
            $user = User::findOrFail($id);

            $postData = $request->except('id', '_method');

            $postData['password'] = bcrypt('test');

            $success = $user->update($postData);

            $data = $user;
        } catch (\Exception $e) {
            $message = $e->getMessage();

            $success = false;
        }

        return compact('data', 'message', 'success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = [];

        $message = '';

        try {
            $user = User::findOrFail($id);

            $data = $user;

            $success = $user->delete();
        } catch (\Exception $e) {
            $message = $e->getMessage();

            $success = false;
        }

        return compact('data', 'message', 'success');
    }
}
