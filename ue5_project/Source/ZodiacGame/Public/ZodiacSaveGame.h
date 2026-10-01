// Copyright (c) 2026 ZODIAC: Rise of the God Beast. C++ Save Game State

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/SaveGame.h"
#include "ZodiacSaveGame.generated.h"

UCLASS()
class ZODIACGAME_API UZodiacSaveGame : public USaveGame
{
	GENERATED_BODY()

public:
	UZodiacSaveGame();

	UPROPERTY(VisibleAnywhere, Category = Basic)
	FString SaveSlotName;

	UPROPERTY(VisibleAnywhere, Category = Basic)
	uint32 UserIndex;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Player")
	int32 SavedLevel;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Player")
	int64 SavedExperience;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Player")
	FString SavedSelectedPath;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Player")
	FVector SavedPlayerLocation;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "World")
	TArray<FString> SavedUnlockedRegions;
};
