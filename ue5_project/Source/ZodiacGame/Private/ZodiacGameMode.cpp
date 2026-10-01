// Copyright (c) 2026 ZODIAC: Rise of the God Beast. Server-Authoritative Dedicated GameMode

#include "ZodiacGameMode.h"
#include "KaelenCharacter.h"
#include "Kismet/GameplayStatics.h"

AZodiacGameMode::AZodiacGameMode()
{
	DefaultPawnClass = AKaelenCharacter::StaticClass();
	TotalMatchPlayers = 100;
	SafeZoneShrinkTimerSeconds = 120.0f;
}

void AZodiacGameMode::BeginPlay()
{
	Super::BeginPlay();
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC SERVER] Dedicated GameMode Initialized. Waiting for %d players."), TotalMatchPlayers);
}

void AZodiacGameMode::StartBattleRoyaleMatch()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC SERVER] Battle Royale match STARTED! Air drop deployment active."));
}

void AZodiacGameMode::ShrinkSafeZone()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC SERVER] Safe Zone is shrinking! Moving zone circle coordinates."));
}

void AZodiacGameMode::CheckVictoryConditions()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC SERVER] Checking remaining players for Victory condition."));
}
