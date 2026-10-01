// ==============================================================================
// ZODIAC: RISE OF THE GOD BEAST — NATIVE C++ 3D PHYSICS ENGINE HEADER
// Language: C++17
// Copyright (c) 2026 ZODIAC Game Studio. All Rights Reserved.
// ==============================================================================

#ifndef ZODIAC_PHYSICS_H
#define ZODIAC_PHYSICS_H

#include <cmath>
#include <vector>
#include <string>

namespace Zodiac {

    struct Vector3 {
        float x;
        float y;
        float z;

        Vector3() : x(0.0f), y(0.0f), z(0.0f) {}
        Vector3(float _x, float _y, float _z) : x(_x), y(_y), z(_z) {}

        float DistanceTo(const Vector3& other) const {
            float dx = x - other.x;
            float dy = y - other.y;
            float dz = z - other.z;
            return std::sqrt(dx * dx + dy * dy + dz * dz);
        }

        Vector3 Normalize() const {
            float len = std::sqrt(x * x + y * y + z * z);
            if (len <= 0.0001f) return Vector3(0, 0, 0);
            return Vector3(x / len, y / len, z / len);
        }
    };

    struct BoundingBox {
        Vector3 min;
        Vector3 max;

        bool Intersects(const Vector3& point) const {
            return (point.x >= min.x && point.x <= max.x &&
                    point.y >= min.y && point.y <= max.y &&
                    point.z >= min.z && point.z <= max.z);
        }
    };

    class PhysicsEngine {
    public:
        PhysicsEngine();
        ~PhysicsEngine();

        bool PerformHitscanRaycast(const Vector3& origin, const Vector3& direction, float maxDistance, Vector3& outHitPoint);
        float CalculateDragonDamage(const Vector3& playerPos, const Vector3& dragonPos, float baseDamage);
    };

} // namespace Zodiac

#endif // ZODIAC_PHYSICS_H
