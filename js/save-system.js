/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — REAL-TIME SAVE / LOAD PERSISTENCE SYSTEM
   ========================================================================== */

class GameSaveSystem {
    constructor() {
        this.STORAGE_KEY = 'ZODIAC_GAME_SAVE_V1';
    }

    saveGame(gameStateData) {
        const saveData = {
            timestamp: Date.now(),
            version: '1.0.0',
            player: {
                level: gameStateData.level || 10,
                xp: gameStateData.xp || 2500,
                path: gameStateData.path || 'physical',
                hp: gameStateData.hp || 1250,
                maxHp: gameStateData.maxHp || 1250,
                stamina: gameStateData.stamina || 450,
                arcanaEnergy: gameStateData.arcanaEnergy || 800,
                position: gameStateData.position || { x: -0.8, y: 0, z: 0 }
            },
            inventory: gameStateData.inventory || [
                { id: 'arm', name: 'Cybernetic Right Arm', tier: 'Epic' },
                { id: 'artifact', name: 'Ancient Mentor Tome', tier: 'Mythic' },
                { id: 'serum', name: 'Tier-2 Biological Serum', quantity: 3 }
            ],
            world: {
                currentRegion: gameStateData.region || 'City Hub',
                weather: gameStateData.weather || 'sunny',
                dayTime: gameStateData.dayTime || 'afternoon',
                activeQuestId: gameStateData.questId || 'mothers_cure_2',
                defeatedBosses: gameStateData.defeatedBosses || []
            }
        };

        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saveData));
            console.log('[SAVE SYSTEM] Game state successfully saved to local persistence!');
            if (window.game3D) {
                window.game3D.spawnFloatingDamageText("GAME PROGRESS SAVED SUCCESSFULLY!", 0x00ff88);
            }
            return true;
        } catch (e) {
            console.error('[SAVE SYSTEM ERROR] Failed to save game state:', e);
            return false;
        }
    }

    loadGame() {
        try {
            const rawData = localStorage.getItem(this.STORAGE_KEY);
            if (!rawData) {
                console.log('[SAVE SYSTEM] No existing save data found. Initializing new game.');
                return null;
            }

            const saveData = JSON.parse(rawData);
            console.log('[SAVE SYSTEM] Loaded game save data from:', new Date(saveData.timestamp).toLocaleString());
            if (window.game3D) {
                window.game3D.spawnFloatingDamageText(`GAME LOADED! LEVEL ${saveData.player.level} RESTORED`, 0x00f0ff);
            }
            return saveData;
        } catch (e) {
            console.error('[SAVE SYSTEM ERROR] Failed to load save file:', e);
            return null;
        }
    }

    clearSave() {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('[SAVE SYSTEM] Save data cleared.');
    }
}

window.saveSystem = new GameSaveSystem();
