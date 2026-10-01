// ==============================================================================
// ZODIAC: RISE OF THE GOD BEAST — GLSL HOLOGRAPHIC GOD BEAST AURA SHADER
// Language: GLSL (OpenGL / WebGL Shader)
// ==============================================================================

uniform float uTime;
uniform float uPulseSpeed;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vFresnel;

void main() {
    vNormal = normal;
    
    // Wave displacement pulse
    vec3 displacedPos = position + normal * (sin(uTime * uPulseSpeed) * 0.08);
    vPosition = displacedPos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
}
