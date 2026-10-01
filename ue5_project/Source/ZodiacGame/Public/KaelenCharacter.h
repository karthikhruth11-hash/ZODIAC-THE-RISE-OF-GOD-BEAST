
// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "GodBeastProgressionComponent.h"
#include "KaelenCharacter.generated.h"

UCLASS(Config = Game)
class ZODIACGAME_API AKaelenCharacter : public ACharacter {
  GENERATED_BODY()

  /** Camera boom positioning the camera behind the character */
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera,
            meta = (AllowPrivateAccess = "true"))
  class USpringArmComponent *CameraBoom;

  /** Follow camera */
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera,
            meta = (AllowPrivateAccess = "true"))
  class UCameraComponent *FollowCamera;

  /** MetaHuman Face Mesh Component */
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "MetaHuman",
            meta = (AllowPrivateAccess = "true"))
  class USkeletalMeshComponent *MetaHumanFaceMesh;

  /** Cybernetic Gauntlet Arm Skeletal/Static Mesh Component */
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly,
            Category = "MetaHuman|Armaments",
            meta = (AllowPrivateAccess = "true"))
  class USkeletalMeshComponent *CyberneticGauntletArm;

  /** Level 0-100 Progression Component */
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Progression",
            meta = (AllowPrivateAccess = "true"))
  UGodBeastProgressionComponent *ProgressionComponent;

public:
  AKaelenCharacter();

  virtual void BeginPlay() override;
  virtual void Tick(float DeltaTime) override;
  virtual void SetupPlayerInputComponent(
      class UInputComponent *PlayerInputComponent) override;

  /** Combat Skill Inputs */
  UFUNCTION(BlueprintCallable, Category = "Combat")
  void ExecuteTacticalCombo();

  UFUNCTION(BlueprintCallable, Category = "Combat")
  void InjectPowerSerum();

  UFUNCTION(BlueprintCallable, Category = "Combat")
  void ActivatePathAbility();

  UFUNCTION(BlueprintCallable, Category = "Combat")
  void TriggerGodBeastAscension();

  FORCEINLINE class USpringArmComponent *GetCameraBoom() const {
    return CameraBoom;
  }
  FORCEINLINE class UCameraComponent *GetFollowCamera() const {
    return FollowCamera;
  }
  FORCEINLINE UGodBeastProgressionComponent *GetProgressionComponent() const {
    return ProgressionComponent;
  }
};
