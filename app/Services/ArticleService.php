<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArticleService
{
    /**
     * Synchronise les articles depuis le flux RSS
     *
     * @return int Nombre d'articles synchronisés
     */
    public function syncArticles(): int
    {
        $leMondeService = new LeMondeService();
        $articles = $leMondeService->fetchArticles();
        
        if ($articles->isEmpty()) {
            return 0;
        }

        $count = 0;
        
        DB::beginTransaction();
        try {
            foreach ($articles as $articleData) {
                $article = Article::updateOrCreate(
                    ['link' => $articleData['link']],
                    $articleData
                );
                
                if ($article->wasRecentlyCreated) {
                    $count++;
                }
            }
            
            DB::commit();
            return $count;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error syncing articles', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return 0;
        }
    }

    /**
     * Récupère les articles paginés
     *
     * @param int $perPage
     * @param string $search
     * @param string $date
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPaginatedArticles(int $perPage = 10, string $search = '')
    {
        $query = Article::active();
        
        // Appliquer le filtre de recherche
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%"); // Ajouter la recherche dans le contenu
            });
        }
        
        return $query->latest()->paginate($perPage);
    }

    /**
     * Récupère un article par son slug
     *
     * @param string $slug
     * @return Article|null
     */
    public function getArticleBySlug(string $slug): ?Article
    {
        return Article::where('slug', $slug)
            ->active()
            ->first();
    }

    /**
     * Archive un article
     *
     * @param Article $article
     * @return bool
     */
    public function archiveArticle(Article $article): bool
    {
        try {
            $article->update(['status' => 'archived']);
            return true;
        } catch (\Exception $e) {
            Log::error('Error archiving article', [
                'article_id' => $article->id,
                'message' => $e->getMessage()
            ]);
            return false;
        }
    }
}