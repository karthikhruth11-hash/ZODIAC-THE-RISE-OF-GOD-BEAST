// Copyright (c) 2026 ZODIAC: Rise of the God Beast. 5-Phase Dragon Boss AI C++ Implementation

#include "ZodiacDragonBoss.h"

AZodiacDragonBoss::AZodiacDragonBoss()
{
	PrimaryActorTick.bCanEverTick = true;
	BossHealth = 5000.0f;
	MaxBossHealth = 5000.0f;
	CurrentPhase = EDragonBossPhase::Phase1_GroundCombat;
}

void AZodiacDragonBoss::BeginPlay()
{
	Super::BeginPlay();
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC BOSS] Cosmic God Beast Dragon spawned with %f HP!"), BossHealth);
}

void AZodiacDragonBoss::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

void AZodiacDragonBoss::TakeBossDamage(float DamageAmount)
{
	BossHealth = FMath::Clamp(BossHealth - DamageAmount, 0.0f, MaxBossHealth);
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC BOSS] Dragon took %f damage! Remaining HP: %f"), DamageAmount, BossHealth);

	if (BossHealth <= 4000.0f && CurrentPhase == EDragonBossPhase::Phase1_GroundCombat)
	{
		TransitionToPhase(EDragonBossPhase::Phase2_FlightFirebreath);
	}
	else if (BossHealth <= 2500.0f && CurrentPhase == EDragonBossPhase::Phase2_FlightFirebreath)
	{
		TransitionToPhase(EDragonBossPhase::Phase3_ElementalShockwave);
	}
	else if (BossHealth <= 1000.0f && CurrentPhase == EDragonBossPhase::Phase3_ElementalShockwave)
	{
		TransitionToPhase(EDragonBossPhase::Phase4_EnragedAura);
	}
	else if (BossHealth <= 0.0f && CurrentPhase != EDragonBossPhase::Phase5_DesperationDefeat)
	{
		TransitionToPhase(EDragonBossPhase::Phase5_DesperationDefeat);
	}
}

void AZodiacDragonBoss::TransitionToPhase(EDragonBossPhase NewPhase)
{
	CurrentPhase = NewPhase;
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC BOSS PHASE SHIFT] Dragon transitioned to new combat phase!"));
}
