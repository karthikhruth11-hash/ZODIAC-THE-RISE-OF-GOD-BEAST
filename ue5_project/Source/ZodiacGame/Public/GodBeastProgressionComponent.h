// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "GodBeastProgressionComponent.generated.h"

UENUM(BlueprintType)
enum class EGodBeastPath : uint8
{
	PhysicalTitan   UMETA(DisplayName = "Physical / Titan Path"),
	MagicalArcana   UMETA(DisplayName = "Magical Arcana Path"),
	ElementalControl UMETA(DisplayName = "Elemental Control Path")
};

UCLASS( ClassGroup=(Custom), meta=(BlueprintSpawnableComponent) )
class ZODIACGAME_API UGodBeastProgressionComponent : public UActorComponent
{
	GENERATED_BODY()

public:	
	UGodBeastProgressionComponent();

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Progression")
	int32 CharacterLevel;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Progression")
	EGodBeastPath SelectedPath;

	UFUNCTION(BlueprintCallable, Category = "Progression")
	void SetCharacterLevel(int32 NewLevel);

	UFUNCTION(BlueprintCallable, Category = "Progression")
	void ApplySerumEffect(float StaminaBoost);

protected:
	virtual void BeginPlay() override;
};
