<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    /**
     * Show the luxury admin login form.
     */
    public function showLoginForm()
    {
        if (Auth::check()) {
            return redirect()->route('admin.gallery.index');
        }

        return view('admin.login');
    }

    /**
     * Handle admin login attempt.
     */
    public function login(Request $request)
    {
        $request->validate([
            'login_id' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginId = trim($request->input('login_id'));
        $password = $request->input('password');
        $remember = $request->boolean('remember');

        // Support login by email, username, or default 'admin'
        $user = User::where('email', $loginId)
            ->orWhere('name', $loginId)
            ->first();

        if (!$user && strtolower($loginId) === 'admin') {
            $user = User::where('email', 'admin@neema.com')->first();
        }

        if ($user && Auth::attempt(['email' => $user->email, 'password' => $password], $remember)) {
            $request->session()->regenerate();

            return redirect()->intended(route('admin.gallery.index'))
                ->with('success', "Welcome back, {$user->name}!");
        }

        return back()
            ->withInput($request->only('login_id', 'remember'))
            ->withErrors(['login_id' => 'Invalid Login ID or Password. Please try again.']);
    }

    /**
     * Log out admin user.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('success', 'You have been logged out securely.');
    }
}
