<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Le Monde Articles') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @viteReactRefresh 
    @vite(['resources/js/App.tsx'])
</head>
<body class="font-sans antialiased h-full bg-gray-50 dark:bg-gray-900">
    <div id="app" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4"></div>
</body>
</html> 