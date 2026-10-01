// Copyright (c) 2026 ZODIAC: Rise of the God Beast. Driveable Tactical Vehicle C++ Implementation

#include "ZodiacVehicle.h"
#include "Components/StaticMeshComponent.h"
#include "GameFramework/Character.h"

AZodiacVehicle::AZodiacVehicle()
{
	PrimaryActorTick.bCanEverTick = true;
	ChassisMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ChassisMesh"));
	RootComponent = ChassisMesh;
	MaxSpeed = 1200.0f;
	FuelLevel = 100.0f;
}

void AZodiacVehicle::EnterVehicle(ACharacter* Driver)
{
	if (Driver)
	{
		UE_LOG(LogTemp, Warning, TEXT("[ZODIAC VEHICLE] Player entered tactical vehicle. Vehicle control active."));
	}
}

void AZodiacVehicle::ExitVehicle()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC VEHICLE] Player exited vehicle. Handing back pawn control."));
}
