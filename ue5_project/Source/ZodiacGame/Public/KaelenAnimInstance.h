// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Animation/AnimInstance.h"
#include "KaelenAnimInstance.generated.h"

UCLASS()
class ZODIACGAME_API UKaelenAnimInstance : public UAnimInstance
{
	GENERATED_BODY()

public:
	UKaelenAnimInstance();

	virtual void NativeInitializeAnimation() override;
	virtual void NativeUpdateAnimation(float DeltaTime) override;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Movement")
	float Speed;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Movement")
	bool bIsInAir;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Combat")
	bool bIsAttacking;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "MetaHuman")
	float FacialTensionWeight;
};
