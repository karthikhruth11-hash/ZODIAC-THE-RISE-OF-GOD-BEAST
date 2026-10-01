// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#include "ZodiacWeapon.h"
#include "Components/SkeletalMeshComponent.h"
#include "Kismet/KismetSystemLibrary.h"

AZodiacWeapon::AZodiacWeapon()
	: BaseDamage(650.0f)
	, FireRate(0.12f)
	, MaxAmmo(30)
{
	PrimaryActorTick.bCanEverTick = false;
	WeaponMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("WeaponMesh"));
	RootComponent = WeaponMesh;
}

void AZodiacWeapon::FireHitscanRaycast(FVector StartPos, FVector Direction)
{
	FVector EndPos = StartPos + (Direction * 10000.0f);
	FHitResult HitResult;
	TArray<AActor*> ActorsToIgnore;
	ActorsToIgnore.Add(this);

	bool bHit = UKismetSystemLibrary::LineTraceSingle(
		GetWorld(),
		StartPos,
		EndPos,
		ETraceTypeQuery::TraceTypeQuery1,
		false,
		ActorsToIgnore,
		EDrawDebugTrace::ForDuration,
		HitResult,
		true
	);

	if (bHit)
	{
		UE_LOG(LogTemp, Warning, TEXT("[C++ WEAPON HITSCAN] Hit Actor: %s with Damage: %f"), *HitResult.GetActor()->GetName(), BaseDamage);
	}
}
