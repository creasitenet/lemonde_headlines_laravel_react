<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use SimpleXMLElement;

class LeMondeService
{
    private const RSS_URL = 'https://www.lemonde.fr/rss/une.xml';
    private const TIMEOUT = 15;

    /**
     * Récupère les articles depuis le flux RSS de Le Monde
     *
     * @return Collection
     */
    public function fetchArticles(): Collection
    {
        try {
            $response = Http::timeout(self::TIMEOUT)
                ->get(self::RSS_URL);

            if (!$response->successful()) {
                Log::error('Failed to fetch Le Monde RSS feed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return collect();
            }

            return $this->parseRssFeed($response->body());
        } catch (\Exception $e) {
            Log::error('Error fetching Le Monde RSS feed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return collect();
        }
    }

    /**
     * Parse le flux RSS et retourne une collection d'articles
     *
     * @param string $xmlContent
     * @return Collection
     */
    private function parseRssFeed(string $xmlContent): Collection
    {
        try {
            $xml = new SimpleXMLElement($xmlContent, LIBXML_NOCDATA);
            $articles = collect();

            foreach ($xml->channel->item as $item) {
                $media = $item->children('media', true)->content->attributes();
                
                $articles->push([
                    'title' => (string) $item->title,
                    'description' => (string) $item->description,
                    'link' => (string) $item->link,
                    'published_at' => (string) $item->pubDate,
                    'image_url' => (string) $media->url,
                    'slug' => $this->generateSlug((string) $item->title),
                    'status' => 'active'
                ]);
            }

            return $articles;
        } catch (\Exception $e) {
            Log::error('Error parsing Le Monde RSS feed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return collect();
        }
    }

    /**
     * Génère un slug unique à partir du titre
     *
     * @param string $title
     * @return string
     */
    private function generateSlug(string $title): string
    {
        return Str::slug($title) . '-' . Str::random(6);
    }
} 