<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Services\ArticleService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class ArticleController extends Controller
{
    public function __construct(
        private readonly ArticleService $articleService
    ) {}

    /**
     * Liste les articles paginés
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $lastSync = Cache::get('last_lemonde_sync');
        $syncIntervalHours = 24; // Synchroniser si la dernière synchro date de plus de 24 heures

        if (!$lastSync || Carbon::parse($lastSync)->addHours($syncIntervalHours)->isPast()) {
            // Déclencher la synchronisation si nécessaire
            // Nous pouvons potentiellement faire cette synchronisation en arrière-plan pour ne pas bloquer la requête
            // Mais pour simplifier dans un premier temps, on la fait ici.
            $this->articleService->syncArticles();
            Cache::put('last_lemonde_sync', Carbon::now(), Carbon::now()->addHours($syncIntervalHours)); // Mettre à jour la date de dernière synchro et le cache
        }

        $perPage = $request->input('per_page', 10);
        $search = $request->input('search') ?? '';
        
        $articles = $this->articleService->getPaginatedArticles($perPage, $search);
        
        return ArticleResource::collection($articles);
    }

    /**
     * Affiche un article spécifique
     */
    public function show(string $slug): ArticleResource|Response
    {
        $article = $this->articleService->getArticleBySlug($slug);

        if (!$article) {
            return response([
                'message' => 'Article non trouvé'
            ], 404);
        }

        return new ArticleResource($article);
    }

    /**
     * Archive un article
     */
    public function archive(string $slug): Response
    {
        $article = $this->articleService->getArticleBySlug($slug);

        if (!$article) {
            return response([
                'message' => 'Article non trouvé'
            ], 404);
        }

        if ($this->articleService->archiveArticle($article)) {
            return response([
                'message' => 'Article archivé avec succès'
            ]);
        }

        return response([
            'message' => 'Erreur lors de l\'archivage de l\'article'
        ], 500);
    }

    /**
     * Synchronise les articles depuis Le Monde
     */
    public function sync(): Response
    {
        $count = $this->articleService->syncArticles();

        return response([
            'message' => $count > 0 
                ? "{$count} nouveaux articles ont été synchronisés."
                : 'Aucun nouvel article à synchroniser.'
        ]);
    }
}