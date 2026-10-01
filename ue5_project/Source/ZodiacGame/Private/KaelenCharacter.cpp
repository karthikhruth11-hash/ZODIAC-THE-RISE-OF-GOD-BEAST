// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#include "KaelenCharacter.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "Components/SkeletalMeshComponent.h"
#include "Kismet/GameplayStatics.h"

AKaelenCharacter::AKaelenCharacter()
{
	PrimaryActorTick.bCanEverTick = true;

	// Set size for collision capsule
	GetCapsuleComponent()->InitCapsuleSize(42.f, 96.0f);

	// Configure character movement
	GetCharacterMovement()->bOrientRotationToMovement = true;
	GetCharacterMovement()->RotationRate = FRotator(0.0f, 500.0f, 0.0f);
	GetCharacterMovement()->JumpZVelocity = 700.f;
	GetCharacterMovement()->AirControl = 0.35f;
	GetCharacterMovement()->MaxWalkSpeed = 600.f;

	// Create Camera Boom
	CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(RootComponent);
	CameraBoom->TargetArmLength = 400.0f;
	CameraBoom->bUsePawnControlRotation = true;

	// Create Follow Camera
	FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName);
	FollowCamera->bUsePawnControlRotation = false;

	// MetaHuman Face Mesh Socket Attachment
	MetaHumanFaceMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("MetaHumanFaceMesh"));
	MetaHumanFaceMesh->SetupAttachment(GetMesh(), TEXT("head"));

	// Cybernetic Gauntlet Arm Attachment
	CyberneticGauntletArm = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("CyberneticGauntletArm"));
	CyberneticGauntletArm->SetupAttachment(GetMesh(), TEXT("hand_r"));

	// Progression Component
	ProgressionComponent = CreateDefaultSubobject<UGodBeastProgressionComponent>(TEXT("ProgressionComponent"));
}

void AKaelenCharacter::BeginPlay()
{
	Super::BeginPlay();
}

void AKaelenCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

void AKaelenCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAction("AttackCombo", IE_Pressed, this, &AKaelenCharacter::ExecuteTacticalCombo);
	PlayerInputComponent->BindAction("InjectSerum", IE_Pressed, this, &AKaelenCharacter::InjectPowerSerum);
	PlayerInputComponent->BindAction("SpecialAbility", IE_Pressed, this, &AKaelenCharacter::ActivatePathAbility);
	PlayerInputComponent->BindAction("GodBeastAscension", IE_Pressed, this, &AKaelenCharacter::TriggerGodBeastAscension);
}

void AKaelenCharacter::ExecuteTacticalCombo()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC] Kaelen executed Tactical Combo attack!"));
}

void AKaelenCharacter::InjectPowerSerum()
{
	if (ProgressionComponent)
	{
		ProgressionComponent->ApplySerumEffect(25.0f);
	}
}

void AKaelenCharacter::ActivatePathAbility()
{
	UE_LOG(LogTemp, Warning, TEXT("[ZODIAC] Special path ability activated!"));
}

void AKaelenCharacter::TriggerGodBeastAscension()
{
	if (ProgressionComponent)
	{
		ProgressionComponent->SetCharacterLevel(90);
	}
}
