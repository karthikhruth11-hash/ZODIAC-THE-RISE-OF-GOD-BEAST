// ==============================================================================
// ZODIAC: RISE OF THE GOD BEAST — GLSL SUBSURFACE SKIN SCATTERING SHADER
// Language: GLSL (OpenGL / WebGL Shader)
// ==============================================================================

precision mediump float;

uniform vec3 uSkinColor;
uniform vec3 uSubsurfaceColor;
uniform vec3 uLightPosition;
uniform float uSubsurfaceIntensity;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vPosition);
    
    // Standard Lambertian Diffuse
    float NdotL = max(dot(normal, lightDir), 0.0);
    
    // Subsurface Backscattering Approximation
    float backLight = max(dot(-normal, lightDir), 0.0);
    vec3 sss = uSubsurfaceColor * pow(backLight, 2.0) * uSubsurfaceIntensity;
    
    vec3 finalColor = uSkinColor * NdotL + sss;
    gl_FragColor = vec4(finalColor, 1.0);
}
