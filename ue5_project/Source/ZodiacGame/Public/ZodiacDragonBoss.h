// Copyright (c) 2026 ZODIAC: Rise of the God Beast. 5-Phase Dragon Boss AI C++ Header

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "ZodiacDragonBoss.generated.h"

UENUM(BlueprintType)
enum class EDragonBossPhase : uint8
{
	Phase1_GroundCombat     UMETA(DisplayName = "Phase 1: Ground Combat"),
	Phase2_FlightFirebreath UMETA(DisplayName = "Phase 2: Flight Firebreath"),
	Phase3_ElementalShockwave UMETA(DisplayName = "Phase 3: Elemental Shockwave"),
	Phase4_EnragedAura      UMETA(DisplayName = "Phase 4: Enraged Cyan Aura"),
	Phase5_DesperationDefeat UMETA(DisplayName = "Phase 5: Final Defeat")
};

UCLASS()
class ZODIACGAME_API AZodiacDragonBoss : public ACharacter
{
	GENERATED_BODY()

public:
	AZodiacDragonBoss();

	virtual void BeginPlay() override;
	virtual void Tick(float DeltaTime) override;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DragonBoss")
	EDragonBossPhase CurrentPhase;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DragonBoss")
	float BossHealth;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DragonBoss")
	float MaxBossHealth;

	UFUNCTION(BlueprintCallable, Category = "DragonBoss")
	void TakeBossDamage(float DamageAmount);

	UFUNCTION(BlueprintCallable, Category = "DragonBoss")
	void TransitionToPhase(EDragonBossPhase NewPhase);
};
