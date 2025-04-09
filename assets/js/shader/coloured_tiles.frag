#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;
// uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(
            dot(
                st.xy,
                vec2(12.9898, u_time/100.0)
                )
            )*43758.5453123);
}

void main() {
    // Cornflower Blue
    // gl_FragColor = vec4(0.392, 0.584, 0.929, 1.0); 

    float unit = 84.0;

    // vec2 unit_res = u_resolution.xy/vec2(unit);
    // vec2 st = gl_FragCoord.xy/unit_res;

    vec2 st = gl_FragCoord.xy/unit;

    // st *= 20.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords
    // vec2 fpos = fract(st);  // get the fractional coords

    // Assign a random value based on the integer coord
    vec4 color = vec4(u_color*1.0, random( ipos ) * 1.0);
    //vec4 color = vec4(u_color.xyz, floor(random( ipos ) + 0.5) * 1.0);
    //vec3 color = vec3(u_color.xy, floor(random( ipos ) + 0.5) * 1.0);

    // gl_FragColor = vec4(color, random( ipos ) * 1.0);
    gl_FragColor = color;
}