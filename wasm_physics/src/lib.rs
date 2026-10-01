// ==============================================================================
// ZODIAC: RISE OF THE GOD BEAST — RUST WASM HIGH-PERFORMANCE PHYSICS ENGINE
// Language: Rust
// ==============================================================================

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Vector3D {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

#[wasm_bindgen]
impl Vector3D {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32, z: f32) -> Vector3D {
        Vector3D { x, y, z }
    }

    pub fn distance_to(&self, other: &Vector3D) -> f32 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        let dz = self.z - other.z;
        (dx * dx + dy * dy + dz * dz).sqrt()
    }
}

#[wasm_bindgen]
pub fn calculate_dragon_hitscan_damage(
    player_x: f32, player_z: f32,
    dragon_x: f32, dragon_z: f32,
    base_damage: f32
) -> f32 {
    let dx = player_x - dragon_x;
    let dz = player_z - dragon_z;
    let dist = (dx * dx + dz * dz).sqrt();
    
    if dist < 3.0 {
        base_damage * 2.0 // Critical melee hit
    } else if dist < 12.0 {
        base_damage * 1.0 // Standard damage
    } else {
        base_damage * 0.5 // Falloff damage
    }
}
