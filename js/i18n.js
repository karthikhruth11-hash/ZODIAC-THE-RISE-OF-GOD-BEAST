/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — MULTI-LANGUAGE I18N TRANSLATION ENGINE
   ========================================================================== */

class ZodiacI18nEngine {
    constructor() {
        this.currentLang = 'en';
        this.translations = {
            en: {
                game_title: "ZODIAC",
                game_subtitle: "RISE OF THE GOD BEAST",
                home_lobby: "Home Lobby",
                arena: "3D Playable Arena",
                studio: "Kaelen Vance 360° Studio",
                campaign: "Level 1-200 Campaign",
                story: "Story & Quests",
                ue5_specs: "UE5 C++ Specs",
                start_game: "START GAME",
                enter_level: "ENTER LEVEL",
                story_lore: "Story Lore",
                active_missions: "Active Missions",
                achievements: "Achievements",
                highest_unlocked: "HIGHEST UNLOCKED: LEVEL",
                tactical_combo: "Tactical Combo",
                inject_serum: "Inject Serum",
                godbeast_aura: "God Beast Aura",
                save_game: "Save Game",
                load_game: "Load Game",
                cyber_radar: "CYBER RADAR 360°"
            },
            es: {
                game_title: "ZODIAC",
                game_subtitle: "EL RESURGIR DE LA BESTIA DIOS",
                home_lobby: "Vestíbulo Principal",
                arena: "Arena 3D Jugable",
                studio: "Estudio 360° Kaelen",
                campaign: "Campaña Nivel 1-200",
                story: "Historia y Misiones",
                ue5_specs: "Especificaciones UE5 C++",
                start_game: "INICIAR JUEGO",
                enter_level: "ENTRAR AL NIVEL",
                story_lore: "Lore de la Historia",
                active_missions: "Misiones Activas",
                achievements: "Logros",
                highest_unlocked: "MÁXIMO DESBLOQUEADO: NIVEL",
                tactical_combo: "Combo Táctico",
                inject_serum: "Inyectar Suero",
                godbeast_aura: "Aura de Bestia Dios",
                save_game: "Guardar Partida",
                load_game: "Cargar Partida",
                cyber_radar: "RADAR CIBERNÉTICO 360°"
            },
            fr: {
                game_title: "ZODIAC",
                game_subtitle: "L'ESSOR DE LA BÊTE DIVINE",
                home_lobby: "Lobby Principal",
                arena: "Arène 3D Jouable",
                studio: "Studio 360° Kaelen",
                campaign: "Campagne Niveau 1-200",
                story: "Histoire & Quêtes",
                ue5_specs: "Spécifications UE5 C++",
                start_game: "LANCER LE JEU",
                enter_level: "ENTRER AU NIVEAU",
                story_lore: "Histoire & Lore",
                active_missions: "Missions Actives",
                achievements: "Succès",
                highest_unlocked: "NIVEAU LE PLUS ÉLEVÉ DÉBLOQUÉ:",
                tactical_combo: "Combo Tactique",
                inject_serum: "Injecter Sérum",
                godbeast_aura: "Aura Bête Divine",
                save_game: "Sauvegarder",
                load_game: "Charger",
                cyber_radar: "RADAR CYBER 360°"
            },
            de: {
                game_title: "ZODIAC",
                game_subtitle: "AUFSTIEG DER GOTT-BESTIE",
                home_lobby: "Haupt-Lobby",
                arena: "Spieltastische 3D-Arena",
                studio: "Kaelen Vance 360° Studio",
                campaign: "Level 1-200 Kampagne",
                story: "Story & Quests",
                ue5_specs: "UE5 C++ Specs",
                start_game: "SPIEL STARTEN",
                enter_level: "LEVEL BETRETEN",
                story_lore: "Geschichte & Lore",
                active_missions: "Aktive Missionen",
                achievements: "Erfolge",
                highest_unlocked: "HÖCHSTES FREIGESCHALTETES LEVEL:",
                tactical_combo: "Taktische Kombo",
                inject_serum: "Serum Injizieren",
                godbeast_aura: "Gott-Bestien-Aura",
                save_game: "Speichern",
                load_game: "Laden",
                cyber_radar: "CYBER-RADAR 360°"
            },
            ja: {
                game_title: "ZODIAC",
                game_subtitle: "ゴッドビーストの覚醒",
                home_lobby: "ホームロビー",
                arena: "3Dプレイ可能アリーナ",
                studio: "ケーレン360°スタジオ",
                campaign: "レベル1-200キャンペーン",
                story: "ストーリー＆クエスト",
                ue5_specs: "UE5 C++仕様",
                start_game: "ゲーム開始",
                enter_level: "レベル侵入",
                story_lore: "ストーリー伝承",
                active_missions: "アクティブミッション",
                achievements: "実績",
                highest_unlocked: "最高アンロックレベル:",
                tactical_combo: "タクティカルコンボ",
                inject_serum: "血清注入",
                godbeast_aura: "神獣オーラ",
                save_game: "セーブ",
                load_game: "ロード",
                cyber_radar: "サイバーレーダー 360°"
            },
            zh: {
                game_title: "ZODIAC",
                game_subtitle: "神兽崛起",
                home_lobby: "主大厅",
                arena: "3D可玩竞技场",
                studio: "凯伦 Vance 360°工作室",
                campaign: "等级1-200战役",
                story: "故事与任务",
                ue5_specs: "UE5 C++规范",
                start_game: "开始游戏",
                enter_level: "进入关卡",
                story_lore: "故事背景",
                active_missions: "当前任务",
                achievements: "成就",
                highest_unlocked: "已解锁最高等级:",
                tactical_combo: "战术连招",
                inject_serum: "注射血清",
                godbeast_aura: "神兽光环",
                save_game: "保存游戏",
                load_game: "加载游戏",
                cyber_radar: "赛博雷达 360°"
            },
            hi: {
                game_title: "ZODIAC",
                game_subtitle: "गॉड बीस्ट का उदय",
                home_lobby: "होम लॉबी",
                arena: "3D खेलने योग्य एरिना",
                studio: "केलेन वैंस 360° स्टूडियो",
                campaign: "स्तर 1-200 अभियान",
                story: "कहानी और खोज",
                ue5_specs: "UE5 C++ निर्देंश",
                start_game: "गेम शुरू करें",
                enter_level: "स्तर में प्रवेश करें",
                story_lore: "कहानी का इतिहास",
                active_missions: "सक्रिय मिशन",
                achievements: "उपलब्धियां",
                highest_unlocked: "उच्चतम अनलॉक स्तर:",
                tactical_combo: "सामरिक कॉम्बो",
                inject_serum: "सीरम इंजेक्ट करें",
                godbeast_aura: "गॉड बीस्ट आभामंडल",
                save_game: "गेम सेव करें",
                load_game: "गेम लोड करें",
                cyber_radar: "साइबर रडार 360°"
            },
            ko: {
                game_title: "ZODIAC",
                game_subtitle: "갓 비스트의 부상",
                home_lobby: "홈 로비",
                arena: "3D 플레이 가능 아레나",
                studio: "케일런 360° 스튜디오",
                campaign: "레벨 1-200 캠페인",
                story: "스토리 및 퀘스트",
                ue5_specs: "UE5 C++ 사양",
                start_game: "게임 시작",
                enter_level: "레벨 진입",
                story_lore: "스토리 전설",
                active_missions: "활성 미션",
                achievements: "업적",
                highest_unlocked: "최고 잠금 해제 레벨:",
                tactical_combo: "전술 콤보",
                inject_serum: "혈청 주입",
                godbeast_aura: "갓 비스트 오라",
                save_game: "게임 저장",
                load_game: "게임 불러오기",
                cyber_radar: "사이버 레이더 360°"
            },
            pt: {
                game_title: "ZODIAC",
                game_subtitle: "O DESPERTAR DA BESTA DEUS",
                home_lobby: "Lobby Principal",
                arena: "Arena 3D Jogável",
                studio: "Estúdio 360° Kaelen",
                campaign: "Campanha Nível 1-200",
                story: "História e Missões",
                ue5_specs: "Especificações UE5 C++",
                start_game: "INICIAR JOGO",
                enter_level: "ENTRAR NO NÍVEL",
                story_lore: "História e Lore",
                active_missions: "Missões Ativas",
                achievements: "Conquistas",
                highest_unlocked: "NÍVEL MAIS ALTO DESBLOQUEADO:",
                tactical_combo: "Combo Tático",
                inject_serum: "Injetar Soro",
                godbeast_aura: "Aura da Besta Deus",
                save_game: "Salvar Jogo",
                load_game: "Carregar Jogo",
                cyber_radar: "RADAR CIBERNÉTICO 360°"
            },
            ar: {
                game_title: "ZODIAC",
                game_subtitle: "نهوض الوحش الإلهي",
                home_lobby: "Régiment الرئيسي",
                arena: "ساحة 3D قابلة للعب",
                studio: "استوديو 360° كايلين",
                campaign: "حملة المستوى 1-200",
                story: "القصة والمهام",
                ue5_specs: "مواصفات UE5 C++",
                start_game: "بدء اللعبة",
                enter_level: "دخول المستوى",
                story_lore: "تاريخ القصة",
                active_missions: "المهام النشطة",
                achievements: "الإنجازات",
                highest_unlocked: "أعلى مستوى مفتوح:",
                tactical_combo: "كومبو تكتيكي",
                inject_serum: "حقن المصل",
                godbeast_aura: "هالة الوحش الإلهي",
                save_game: "حفظ اللعبة",
                load_game: "تحميل اللعبة",
                cyber_radar: "رادار سيبراني 360°"
            }
        };
    }

    setLanguage(langCode) {
        if (!this.translations[langCode]) return;
        this.currentLang = langCode;
        const dict = this.translations[langCode];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        const minimapLabel = document.querySelector('.minimap-label');
        if (minimapLabel && dict.cyber_radar) minimapLabel.textContent = dict.cyber_radar;
    }
}

window.zodiacI18n = new ZodiacI18nEngine();
