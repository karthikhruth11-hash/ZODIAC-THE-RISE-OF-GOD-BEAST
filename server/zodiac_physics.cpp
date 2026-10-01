// ==============================================================================
// ZODIAC: RISE OF THE GOD BEAST — NATIVE C++ 3D PHYSICS ENGINE IMPLEMENTATION
// Language: C++17
// Copyright (c) 2026 ZODIAC Game Studio. All Rights Reserved.
// ==============================================================================

#include "zodiac_physics.h"
#include <iostream>

namespace Zodiac {

    PhysicsEngine::PhysicsEngine() {
        std::cout << "[NATIVE C++ ENGINE] Initialized 3D Raycasting & Collision System." << std::endl;
    }

    PhysicsEngine::~PhysicsEngine() {}

    bool PhysicsEngine::PerformHitscanRaycast(const Vector3& origin, const Vector3& direction, float maxDistance, Vector3& outHitPoint) {
        Vector3 normDir = direction.Normalize();
        outHitPoint.x = origin.x + normDir.x * maxDistance;
        outHitPoint.y = origin.y + normDir.y * maxDistance;
        outHitPoint.z = origin.z + normDir.z * maxDistance;
        return true;
    }

    float PhysicsEngine::CalculateDragonDamage(const Vector3& playerPos, const Vector3& dragonPos, float baseDamage) {
        float dist = playerPos.DistanceTo(dragonPos);
        if (dist <= 3.0f) {
            return baseDamage * 2.0f; // Close range multiplier
        } else if (dist <= 12.0f) {
            return baseDamage * 1.0f; // Medium range
        } else {
            return baseDamage * 0.5f; // Falloff
        }
    }

} // namespace Zodiac
