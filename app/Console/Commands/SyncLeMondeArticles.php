<?php

namespace App\Console\Commands;

use App\Services\ArticleService;
use Illuminate\Console\Command;

class SyncLeMondeArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronise les articles depuis le flux RSS de Le Monde';

    /**
     * Execute the console command.
     */
    public function handle(ArticleService $articleService)
    {
        $this->info('Début de la synchronisation des articles...');

        $count = $articleService->syncArticles();

        if ($count > 0) {
            $this->info("{$count} nouveaux articles ont été synchronisés.");
        } else {
            $this->info('Aucun nouvel article à synchroniser.');
        }
    }
} 