// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#include "GodBeastProgressionComponent.h"

UGodBeastProgressionComponent::UGodBeastProgressionComponent()
{
	PrimaryComponentTick.bCanEverTick = false;
	CharacterLevel = 10;
	SelectedPath = EGodBeastPath::PhysicalTitan;
}

void UGodBeastProgressionComponent::BeginPlay()
{
	Super::BeginPlay();
}

void UGodBeastProgressionComponent::SetCharacterLevel(int32 NewLevel)
{
	CharacterLevel = FMath::Clamp(NewLevel, 0, 100);
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC] Kaelen Level updated to: %d"), CharacterLevel);
}

void UGodBeastProgressionComponent::ApplySerumEffect(float StaminaBoost)
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC] Applied serum stamina boost +%f"), StaminaBoost);
}
