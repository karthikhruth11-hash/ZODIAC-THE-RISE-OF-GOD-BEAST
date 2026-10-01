// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#include "KaelenAnimInstance.h"
#include "GameFramework/Character.h"
#include "GameFramework/PawnMovementComponent.h"

UKaelenAnimInstance::UKaelenAnimInstance()
    : GroundSpeed(0.0f)
    , bShouldMove(false)
    , bIsFalling(false)
    , bIsCrouching(false)
    , bIsSprinting(false)
{
}

void UKaelenAnimInstance::NativeInitializeAnimation()
{
    Super::NativeInitializeAnimation();
    CharacterOwner = Cast<ACharacter>(TryGetPawnOwner());
}

void UKaelenAnimInstance::NativeUpdateAnimation(float DeltaTime)
{
    Super::NativeUpdateAnimation(DeltaTime);

    if (!CharacterOwner)
    {
        CharacterOwner = Cast<ACharacter>(TryGetPawnOwner());
        if (!CharacterOwner) return;
    }

    // Velocity & Speed
    FVector Velocity = CharacterOwner->GetVelocity();
    Velocity.Z = 0.0f;
    GroundSpeed = Velocity.Size();
    bShouldMove = (GroundSpeed > 3.0f) && (CharacterOwner->GetMovementComponent()->IsMovingOnGround());

    // Stance Flags
    bIsFalling = CharacterOwner->GetMovementComponent()->IsFalling();
    bIsCrouching = CharacterOwner->bIsCrouching;
}
