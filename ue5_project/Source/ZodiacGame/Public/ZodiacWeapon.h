// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ZodiacWeapon.generated.h"

UCLASS()
class ZODIACGAME_API AZodiacWeapon : public AActor
{
	GENERATED_BODY()
	
public:	
	AZodiacWeapon();

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Weapon")
	class USkeletalMeshComponent* WeaponMesh;

	UPROPERTY(EditDefaultsOnly, Category = "Weapon|Stats")
	float BaseDamage;

	UPROPERTY(EditDefaultsOnly, Category = "Weapon|Stats")
	float FireRate;

	UPROPERTY(EditDefaultsOnly, Category = "Weapon|Stats")
	int32 MaxAmmo;

	UFUNCTION(BlueprintCallable, Category = "Weapon")
	void FireHitscanRaycast(FVector StartPos, FVector Direction);
};
