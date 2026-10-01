// Copyright (c) 2026 ZODIAC: Rise of the God Beast. Driveable Tactical Vehicle C++ Header

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "ZodiacVehicle.generated.h"

UCLASS()
class ZODIACGAME_API AZodiacVehicle : public APawn
{
	GENERATED_BODY()

public:
	AZodiacVehicle();

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Vehicle")
	class UStaticMeshComponent* ChassisMesh;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vehicle")
	float MaxSpeed;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vehicle")
	float FuelLevel;

	UFUNCTION(BlueprintCallable, Category = "Vehicle")
	void EnterVehicle(class ACharacter* Driver);

	UFUNCTION(BlueprintCallable, Category = "Vehicle")
	void ExitVehicle();
};
