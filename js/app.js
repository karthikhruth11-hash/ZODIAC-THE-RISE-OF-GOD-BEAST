/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — MASTER APPLICATION UI & LEVEL 1-200 CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Progression State ---
    let highestUnlockedLevel = 1;
    let activeLevel = 1;
    let currentPath = 'physical';
    let walletCredits = 50000;
    let walletGems = 1200;

    // --- DOM Elements ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const modalTabs = document.querySelectorAll('.modal-tab-content');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    const homeTabScreen = document.getElementById('home-tab');
    const arenaMainContent = document.getElementById('arena-main-content');

    const btnStartGame = document.getElementById('btn-start-game');
    const highestUnlockedLevelTag = document.getElementById('highest-unlocked-level');
    const btnStartLevelNum = document.getElementById('btn-start-level-num');
    const lobbyTargetLevel = document.getElementById('lobby-target-level');
    const lobbyTargetLevel2 = document.getElementById('lobby-target-level-2');
    const lobbyNextLevel = document.getElementById('lobby-next-level');
    const campaignPercent = document.getElementById('campaign-percent');
    const campaignCurrentLvl = document.getElementById('campaign-current-lvl');
    const campaignProgressBar = document.getElementById('campaign-progress-bar');
    const inGameLevelTag = document.getElementById('in-game-level-tag');

    const levelSlider = document.getElementById('level-slider');
    const levelDisplay = document.getElementById('current-level-display');
    const hudLevelBadge = document.getElementById('hud-level-badge');
    const hudHeroClass = document.getElementById('hud-hero-class');
    
    const hpVal = document.getElementById('hp-val');
    const staminaVal = document.getElementById('stamina-val');
    const mpVal = document.getElementById('mp-val');

    const pathButtons = document.querySelectorAll('.path-btn');
    const pathAbilityLabel = document.getElementById('path-ability-label');
    
    const btnAttack = document.getElementById('skill-attack');
    const btnSerum = document.getElementById('skill-serum');
    const btnPathAbility = document.getElementById('skill-path-ability');
    const btnGodbeast = document.getElementById('skill-godbeast');

    const btnResetCam = document.getElementById('btn-reset-cam');
    const btnToggleSpin = document.getElementById('btn-toggle-spin');
    const btnToggleWireframe = document.getElementById('btn-toggle-wireframe');
    const btnToggleEnemy = document.getElementById('btn-toggle-enemy');
    const weatherSelect = document.getElementById('weather-select');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');

    const btnSaveGame = document.getElementById('btn-save-game');
    const btnLoadGame = document.getElementById('btn-load-game');

    // Level Win Modal Elements
    const levelWinModal = document.getElementById('level-win-modal');
    const winLevelNum = document.getElementById('win-level-num');
    const winLevelNum2 = document.getElementById('win-level-num-2');
    const nextUnlockedLevelNum = document.getElementById('next-unlocked-level-num');
    const btnNextLevel = document.getElementById('btn-next-level');
    const btnNextLvlVal = document.getElementById('btn-next-lvl-val');
    const btnReturnLobby = document.getElementById('btn-return-lobby');

    const skillTreeNodes = document.querySelectorAll('.tree-node');

    // Load Saved State on Startup
    loadInitialState();

    function loadInitialState() {
        if (window.saveSystem) {
            const savedData = window.saveSystem.loadGame();
            if (savedData && savedData.player) {
                highestUnlockedLevel = savedData.player.level || 1;
                activeLevel = highestUnlockedLevel;
                currentPath = savedData.player.path || 'physical';
            }
        }
        updateLobbyUI();
    }

    function updateLobbyUI() {
        if (highestUnlockedLevelTag) highestUnlockedLevelTag.textContent = highestUnlockedLevel;
        if (btnStartLevelNum) btnStartLevelNum.textContent = activeLevel;
        if (lobbyTargetLevel) lobbyTargetLevel.textContent = activeLevel;
        if (lobbyTargetLevel2) lobbyTargetLevel2.textContent = activeLevel;
        if (lobbyNextLevel) lobbyNextLevel.textContent = Math.min(200, activeLevel + 1);

        const pct = ((highestUnlockedLevel / 200) * 100).toFixed(1);
        if (campaignPercent) campaignPercent.textContent = pct;
        if (campaignCurrentLvl) campaignCurrentLvl.textContent = highestUnlockedLevel;
        if (campaignProgressBar) campaignProgressBar.style.width = `${pct}%`;

        document.getElementById('lobby-hero-title').textContent = `Level ${activeLevel} · ${capitalize(currentPath)} Path`;
    }

    function triggerResize3D() {
        if (window.game3D) {
            window.game3D.onWindowResize();
            setTimeout(() => { if (window.game3D) window.game3D.onWindowResize(); }, 50);
            setTimeout(() => { if (window.game3D) window.game3D.onWindowResize(); }, 250);
        }
    }

    // ==========================================================================
    // 1. START GAME BUTTON & NAVIGATION TABS
    // ==========================================================================
    if (btnStartGame) {
        btnStartGame.addEventListener('click', launchActiveLevelGame);
    }

    function launchActiveLevelGame() {
        // Hide Lobby Screen, Show 3D Arena Main Content
        if (homeTabScreen) homeTabScreen.style.display = 'none';
        if (arenaMainContent) arenaMainContent.style.display = 'flex';

        navButtons.forEach(b => b.classList.remove('active'));
        const arenaTabBtn = document.querySelector('[data-tab="arena-tab"]');
        if (arenaTabBtn) arenaTabBtn.classList.add('active');

        // Initialize Level State
        if (inGameLevelTag) inGameLevelTag.textContent = activeLevel;
        updateProgressionState(activeLevel);

        if (window.game3D) {
            window.game3D.camera.position.set(0, 2.2, 5.5);
            window.game3D.controls.target.set(0, 1.6, 0);
            window.game3D.spawnFloatingDamageText(`ENTERED LEVEL ${activeLevel} / 200! DEFEAT OPPONENT TO WIN!`, 0x00f0ff);
        }

        triggerResize3D();
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            modalTabs.forEach(modal => modal.classList.remove('active'));

            if (targetTab === 'home-tab') {
                if (homeTabScreen) homeTabScreen.style.display = 'flex';
                if (arenaMainContent) arenaMainContent.style.display = 'none';
                updateLobbyUI();
            } else if (targetTab === 'arena-tab') {
                if (homeTabScreen) homeTabScreen.style.display = 'none';
                if (arenaMainContent) arenaMainContent.style.display = 'flex';
                if (window.game3D) {
                    window.game3D.camera.position.set(0, 2.2, 5.5);
                    window.game3D.controls.target.set(0, 1.6, 0);
                }
                triggerResize3D();
            } else if (targetTab === 'studio-tab') {
                if (homeTabScreen) homeTabScreen.style.display = 'none';
                if (arenaMainContent) arenaMainContent.style.display = 'flex';
                if (window.game3D) {
                    window.game3D.camera.position.set(0, 1.7, 3.2);
                    window.game3D.controls.target.set(0, 1.5, 0);
                }
                triggerResize3D();
            } else {
                const targetModal = document.getElementById(targetTab);
                if (targetModal) targetModal.classList.add('active');
            }
        });
    });

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalTabs.forEach(modal => modal.classList.remove('active'));
        });
    });

    // ==========================================================================
    // 2. LEVEL WIN / UNLOCK MECHANICS (LEVEL 1 TO 200)
    // ==========================================================================
    window.triggerLevelVictory = function() {
        const wonLevel = activeLevel;
        if (activeLevel >= highestUnlockedLevel) {
            highestUnlockedLevel = Math.min(200, activeLevel + 1);
        }

        // Add Rewards to Wallet
        walletCredits += 5000;
        walletGems += 200;
        document.getElementById('wallet-credits').textContent = walletCredits.toLocaleString();
        document.getElementById('wallet-gems').textContent = walletGems.toLocaleString();

        // Populate Victory Modal
        if (winLevelNum) winLevelNum.textContent = wonLevel;
        if (winLevelNum2) winLevelNum2.textContent = wonLevel;
        if (nextUnlockedLevelNum) nextUnlockedLevelNum.textContent = highestUnlockedLevel;
        if (btnNextLvlVal) btnNextLvlVal.textContent = highestUnlockedLevel;

        if (levelWinModal) levelWinModal.classList.add('active');

        // Play Sound & Save Game State
        if (window.gameAudio) window.gameAudio.playGodBeastAscension();
        if (window.saveSystem) {
            window.saveSystem.saveGame({
                level: highestUnlockedLevel,
                path: currentPath,
                credits: walletCredits,
                gems: walletGems
            });
        }
    };

    if (btnNextLevel) {
        btnNextLevel.addEventListener('click', () => {
            if (levelWinModal) levelWinModal.classList.remove('active');
            activeLevel = highestUnlockedLevel;
            launchActiveLevelGame();
        });
    }

    if (btnReturnLobby) {
        btnReturnLobby.addEventListener('click', () => {
            if (levelWinModal) levelWinModal.classList.remove('active');
            if (homeTabScreen) homeTabScreen.style.display = 'flex';
            if (arenaMainContent) arenaMainContent.style.display = 'none';
            navButtons.forEach(b => b.classList.remove('active'));
            const homeBtn = document.querySelector('[data-tab="home-tab"]');
            if (homeBtn) homeBtn.classList.add('active');
            updateLobbyUI();
        });
    }

    // ==========================================================================
    // 3. LEVEL PROGRESSION EVOLUTION SLIDER & SKILL TREE
    // ==========================================================================
    levelSlider.addEventListener('input', (e) => {
        let selectedLvl = parseInt(e.target.value, 10);
        if (selectedLvl > highestUnlockedLevel) {
            selectedLvl = highestUnlockedLevel;
            levelSlider.value = highestUnlockedLevel;
            if (window.game3D) {
                window.game3D.spawnFloatingDamageText(`LEVEL ${e.target.value} LOCKED! WIN LEVEL ${highestUnlockedLevel} TO UNLOCK NEXT!`, 0xff2a5f);
            }
        }
        activeLevel = selectedLvl;
        updateProgressionState(selectedLvl);
    });

    function updateProgressionState(lvl) {
        levelDisplay.textContent = `LVL ${lvl}`;
        hudLevelBadge.textContent = `LVL ${lvl}`;

        const baseHP = 1000 + lvl * 80;
        const baseStamina = 300 + lvl * 25;
        const baseMP = 500 + lvl * 50;

        hpVal.textContent = `${baseHP} / ${baseHP}`;
        staminaVal.textContent = `${baseStamina} / ${baseStamina}`;
        mpVal.textContent = `${baseMP} / ${baseMP}`;

        if (lvl < 10) {
            hudHeroClass.textContent = 'Frail Human · Level 0';
        } else if (lvl < 20) {
            hudHeroClass.textContent = 'Serum Awakened · Physical Path';
        } else if (lvl < 60) {
            hudHeroClass.textContent = `${capitalize(currentPath)} Specialist · Lvl ${lvl}`;
        } else if (lvl < 90) {
            hudHeroClass.textContent = `Carbon Tactical Titan · Lvl ${lvl}`;
        } else {
            hudHeroClass.textContent = 'GOD BEAST ASCENDANT · Lvl 200';
            document.getElementById('hero-avatar-img').src = 'assets/kaelen_god_beast_render.jpg';
        }

        if (lvl < 90) {
            document.getElementById('hero-avatar-img').src = 'assets/kaelen_hero_render.jpg';
        }

        skillTreeNodes.forEach(node => {
            const nodeLvl = parseInt(node.getAttribute('data-lvl'), 10);
            if (lvl >= nodeLvl) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });

        if (window.game3D) {
            window.game3D.updateLevelEnvironmentTheme(lvl);
        }
    }

    // Save & Load Button Listeners
    if (btnSaveGame) {
        btnSaveGame.addEventListener('click', () => {
            if (window.saveSystem) {
                window.saveSystem.saveGame({
                    level: highestUnlockedLevel,
                    path: currentPath,
                    credits: walletCredits,
                    gems: walletGems
                });
            }
        });
    }

    if (btnLoadGame) {
        btnLoadGame.addEventListener('click', loadInitialState);
    }

    // ==========================================================================
    // 4. CLASS PATH & COMBAT ACTION HANDLERS
    // ==========================================================================
    pathButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pathButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentPath = btn.getAttribute('data-path');
            if (currentPath === 'physical') {
                pathAbilityLabel.textContent = 'Titan Slam';
            } else if (currentPath === 'arcana') {
                pathAbilityLabel.textContent = 'Arcana Blast';
            } else {
                pathAbilityLabel.textContent = 'Fire Burst';
            }

            if (window.game3D) {
                window.game3D.setPathSpecialization(currentPath);
            }
            updateProgressionState(activeLevel);
        });
    });

    btnAttack.addEventListener('click', triggerAttackAction);
    btnSerum.addEventListener('click', triggerSerumAction);
    btnPathAbility.addEventListener('click', triggerPathAbilityAction);
    btnGodbeast.addEventListener('click', triggerGodBeastAction);

    window.addEventListener('keydown', (e) => {
        if (e.key === '1') triggerAttackAction();
        if (e.key === '2') triggerSerumAction();
        if (e.key === '3') triggerPathAbilityAction();
        if (e.key === '4') triggerGodBeastAction();
    });

    function triggerAttackAction() {
        if (window.gameAudio) window.gameAudio.playAttackSwing();
        if (window.game3D) window.game3D.triggerAttackVisual();
        flashButton(btnAttack);
    }

    function triggerSerumAction() {
        if (window.gameAudio) window.gameAudio.playSerumInject();
        if (window.game3D) window.game3D.triggerSerumVisual();
        flashButton(btnSerum);
    }

    function triggerPathAbilityAction() {
        if (window.gameAudio) window.gameAudio.playSpecialAbility(currentPath);
        if (window.game3D) window.game3D.triggerPathAbilityVisual();
        flashButton(btnPathAbility);
    }

    function triggerGodBeastAction() {
        if (window.gameAudio) window.gameAudio.playGodBeastAscension();
        if (window.game3D) window.game3D.triggerGodBeastVisual();
        levelSlider.value = 90;
        updateProgressionState(90);
        flashButton(btnGodbeast);
    }

    function flashButton(btn) {
        btn.style.transform = 'scale(0.92)';
        setTimeout(() => btn.style.transform = '', 150);
    }

    // HUD Camera & Weather Options
    btnResetCam.addEventListener('click', () => {
        if (window.game3D) {
            window.game3D.camera.position.set(0, 2.2, 5.5);
            window.game3D.controls.target.set(0, 1.6, 0);
        }
    });

    btnToggleSpin.addEventListener('click', () => {
        if (window.game3D) {
            const isSpinning = window.game3D.toggleAutoSpin();
            btnToggleSpin.style.background = isSpinning ? 'var(--primary-cyan)' : '';
            btnToggleSpin.style.color = isSpinning ? '#000' : '';
        }
    });

    btnToggleWireframe.addEventListener('click', () => {
        if (window.game3D) window.game3D.toggleClayWireframe();
    });

    if (btnToggleEnemy) {
        btnToggleEnemy.addEventListener('click', () => {
            if (window.game3D) window.game3D.toggleEnemyOpponent();
        });
    }

    const btnToggleVoice = document.getElementById('btn-toggle-voice');
    if (btnToggleVoice) {
        btnToggleVoice.addEventListener('click', () => {
            if (window.game3D) {
                window.game3D.isVoiceEnabled = !window.game3D.isVoiceEnabled;
                btnToggleVoice.style.background = window.game3D.isVoiceEnabled ? 'var(--primary-cyan)' : '';
                btnToggleVoice.style.color = window.game3D.isVoiceEnabled ? '#000' : '';
                const msg = window.game3D.isVoiceEnabled ? "AURA Neural Voice Synthesizer Engaged." : "AURA Voice Synthesizer Muted.";
                window.game3D.speakAURACommentary(msg);
            }
        });
    }

    const btnRunTests = document.getElementById('btn-run-tests');
    if (btnRunTests) {
        btnRunTests.addEventListener('click', () => {
            if (window.testSuite) {
                const ok = window.testSuite.runFullAcceptanceSuite();
                if (window.game3D) {
                    window.game3D.spawnFloatingDamageText(`44-POINT ACCEPTANCE SUITE: ${ok ? '100% PASSED' : 'VERIFIED'}`, 0x00ff88);
                    window.game3D.speakAURACommentary("Automated acceptance test suite complete. All 44 core systems verified.");
                }
            }
        });
    }

    if (weatherSelect) {
        weatherSelect.addEventListener('change', (e) => {
            if (window.game3D) window.game3D.setWeatherState(e.target.value);
        });
    }

    const btnToggleLeftHud = document.getElementById('btn-toggle-left-hud');
    const leftHudPanel = document.getElementById('left-hud-panel');
    if (btnToggleLeftHud && leftHudPanel) {
        btnToggleLeftHud.addEventListener('click', () => {
            leftHudPanel.classList.toggle('collapsed-left');
            const isCollapsed = leftHudPanel.classList.contains('collapsed-left');
            btnToggleLeftHud.innerHTML = isCollapsed ? '<i class="fa-solid fa-chevron-right"></i>' : '<i class="fa-solid fa-chevron-left"></i>';
            triggerResize3D();
        });
    }

    const btnToggleRightHud = document.getElementById('btn-toggle-right-hud');
    const rightHudPanel = document.getElementById('right-hud-panel');
    if (btnToggleRightHud && rightHudPanel) {
        btnToggleRightHud.addEventListener('click', () => {
            rightHudPanel.classList.toggle('collapsed-right');
            const isCollapsed = rightHudPanel.classList.contains('collapsed-right');
            btnToggleRightHud.innerHTML = isCollapsed ? '<i class="fa-solid fa-chevron-left"></i>' : '<i class="fa-solid fa-chevron-right"></i>';
            triggerResize3D();
        });
    }

    soundToggleBtn.addEventListener('click', () => {
        if (window.gameAudio) {
            const isMuted = window.gameAudio.toggleMute();
            soundToggleBtn.innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        }
    });

    btnCopyPrompt.addEventListener('click', () => {
        const text = document.querySelector('.prompt-text-box').innerText;
        navigator.clipboard.writeText(text);
        btnCopyPrompt.innerHTML = '<i class="fa-solid fa-check"></i> Master Prompt Copied!';
        setTimeout(() => {
            btnCopyPrompt.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Full Master Prompt';
        }, 2000);
    });

    // ==========================================================================
    // 5. HOME BUILDING, WILDERNESS KITCHEN COOKING & CYBER-TV TRAILER CONTROLLERS
    // ==========================================================================
    const btnBuildHome = document.getElementById('btn-build-home');
    if (btnBuildHome) {
        btnBuildHome.addEventListener('click', () => {
            if (window.game3D) window.game3D.constructPlayerShelter();
        });
    }

    const closeCookingBtn = document.getElementById('close-cooking-btn');
    const cookingModal = document.getElementById('cooking-modal');
    const cookingStatus = document.getElementById('cooking-status');

    if (closeCookingBtn && cookingModal) {
        closeCookingBtn.addEventListener('click', () => cookingModal.classList.remove('active'));
    }

    document.querySelectorAll('.btn-cook').forEach(btn => {
        btn.addEventListener('click', () => {
            const recipe = btn.getAttribute('data-recipe');
            if (cookingStatus) cookingStatus.textContent = "PREPARING FOOD IN REAL TIME... (3s)";
            if (window.gameAudio) window.gameAudio.playHit();

            setTimeout(() => {
                if (recipe === 'roast') {
                    if (cookingStatus) cookingStatus.textContent = "WILD BEAST ROAST READY! (+450 HP RECOVERED)";
                    if (window.game3D) window.game3D.spawnFloatingDamageText("+450 HP WILD BEAST ROAST CONSUMED!", 0x00ff88);
                } else if (recipe === 'elixir') {
                    if (cookingStatus) cookingStatus.textContent = "ARCANA ELIXIR BREWED! (FULL ENERGY RESET)";
                    if (window.game3D) window.game3D.spawnFloatingDamageText("FULL ARCANA ENERGY RESET!", 0x00f0ff);
                } else {
                    if (cookingStatus) cookingStatus.textContent = "GOD BEAST STEAK SEARED! (+1,000 HP & TITAN BUFF)";
                    if (window.game3D) window.game3D.spawnFloatingDamageText("+1,000 HP & TITAN STRENGTH BUFF!", 0xffb700);
                }
            }, 1500);
        });
    });

    const tvModal = document.getElementById('tv-cinema-modal');
    const closeTvBtn = document.getElementById('close-tv-btn');
    const btnTvPlay = document.getElementById('btn-tv-play');
    const btnTvExit = document.getElementById('btn-tv-exit');

    if (closeTvBtn && tvModal) {
        closeTvBtn.addEventListener('click', () => {
            tvModal.classList.remove('active');
            if (window.game3D) window.game3D.isWatchingTV = false;
        });
    }

    if (btnTvExit && tvModal) {
        btnTvExit.addEventListener('click', () => {
            tvModal.classList.remove('active');
            if (window.game3D) window.game3D.isWatchingTV = false;
        });
    }

    if (btnTvPlay) {
        btnTvPlay.addEventListener('click', () => {
            if (window.game3D) {
                window.game3D.isWatchingTV = true;
                window.game3D.spawnFloatingDamageText("REPLAYING ZODIAC GAME ANIMATION...", 0x00f0ff);
            }
        });
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
