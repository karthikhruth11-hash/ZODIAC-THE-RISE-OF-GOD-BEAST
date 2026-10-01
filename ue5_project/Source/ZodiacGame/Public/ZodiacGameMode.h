// Copyright (c) 2026 ZODIAC: Rise of the God Beast. Server-Authoritative Dedicated GameMode

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "ZodiacGameMode.generated.h"

UCLASS()
class ZODIACGAME_API AZodiacGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	AZodiacGameMode();

	virtual void BeginPlay() override;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "BattleRoyale")
	int32 TotalMatchPlayers;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "BattleRoyale")
	float SafeZoneShrinkTimerSeconds;

	UFUNCTION(BlueprintCallable, Category = "BattleRoyale")
	void StartBattleRoyaleMatch();

	UFUNCTION(BlueprintCallable, Category = "BattleRoyale")
	void ShrinkSafeZone();

	UFUNCTION(BlueprintCallable, Category = "BattleRoyale")
	void CheckVictoryConditions();
};
