<!DOCTYPE html>
<html lang="en" class="h-full bg-[#141311] text-[#F9F8F3]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Studio Administration Login | NEEMA / LUVELLE INTERIORS</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Cinzel', serif; }
        .gold-glow { box-shadow: 0 0 30px rgba(197, 168, 128, 0.15); }
    </style>
</head>
<body class="min-h-full flex flex-col items-center justify-center bg-[#141311] text-[#F9F8F3] p-4 sm:p-6 relative overflow-x-hidden selection:bg-[#C5A880] selection:text-[#141311]">

    <!-- Subtle Background Ambient Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Main Card Container -->
    <div class="w-full max-w-md bg-[#1C1B18] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 gold-glow">
        
        <!-- Brand Header -->
        <div class="text-center mb-8">
            <div class="w-14 h-14 mx-auto rounded-full border border-[#C5A880]/40 flex items-center justify-center bg-[#C5A880]/10 text-[#C5A880] font-serif font-bold text-2xl shadow-inner mb-4">
                N
            </div>
            <h1 class="font-serif text-2xl sm:text-3xl tracking-widest text-[#F9F8F3] font-semibold">NEEMA / LUVELLE</h1>
            <p class="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase mt-1.5">Studio Administration</p>
        </div>

        <!-- Flash Success Notification (e.g. after logout) -->
        @if(session('success'))
        <div class="mb-6 p-3.5 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/40 text-xs text-[#F9F8F3] flex items-center space-x-2">
            <span class="text-[#C5A880] font-bold">✓</span>
            <p class="font-medium">{{ session('success') }}</p>
        </div>
        @endif

        <!-- Error Notification -->
        @if($errors->any())
        <div class="mb-6 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-xs text-red-200">
            @foreach($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
        @endif

        <!-- Login Form -->
        <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-5">
            @csrf

            <!-- Login ID / Email -->
            <div>
                <label for="login_id" class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Login ID / Email
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <input 
                        type="text" 
                        id="login_id" 
                        name="login_id" 
                        value="{{ old('login_id', 'admin@neema.com') }}" 
                        required 
                        autofocus
                        placeholder="admin@neema.com or admin" 
                        class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C5A880] transition"
                    >
                </div>
            </div>

            <!-- Password -->
            <div>
                <label for="password" class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Password
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        placeholder="••••••••" 
                        class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C5A880] transition"
                    >
                    <button 
                        type="button" 
                        onclick="togglePassword()"
                        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/80 transition"
                    >
                        <svg id="eyeIcon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between pt-1">
                <label class="flex items-center space-x-2.5 cursor-pointer">
                    <input type="checkbox" name="remember" value="1" class="w-4 h-4 accent-[#C5A880] rounded">
                    <span class="text-xs text-white/70">Remember this device</span>
                </label>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit" 
                class="w-full py-3.5 rounded-xl bg-[#C5A880] text-[#141311] text-xs font-semibold tracking-widest uppercase hover:bg-[#d8bc94] transition shadow-lg shadow-[#C5A880]/20 font-sans cursor-pointer mt-2"
            >
                Sign In to Dashboard
            </button>
        </form>

        <!-- Default Credentials Hint Card -->
        <div class="mt-6 pt-5 border-t border-white/10 text-center">
            <p class="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1">Default Credentials</p>
            <p class="text-xs text-[#C5A880] font-mono">
                ID: <span class="text-white/90">admin@neema.com</span> · Pass: <span class="text-white/90">admin123</span>
            </p>
        </div>
    </div>

    <!-- Back to website link -->
    <div class="mt-8 relative z-10">
        <a href="/" class="text-xs font-mono tracking-wider text-white/50 hover:text-[#C5A880] transition flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Return to Live Website</span>
        </a>
    </div>

    <script>
        function togglePassword() {
            const input = document.getElementById('password');
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }
    </script>
</body>
</html>
