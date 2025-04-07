precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
in vec2 v_texcoord;
out vec4 outColor;

void main() {
    // Get the current cell's state from the texture.
    vec2 texcoord = v_texcoord;
    vec4 centerColor = texture2D(u_texture, texcoord);
    float center = centerColor.r; // Use the red channel as the cell state (0 or 1)

    // Calculate the coordinates of the neighboring cells.
    vec2 texelSize = 1.0 / u_resolution;
    float neighborSum = 0.0;

    // Sum the states of the eight neighbors.
    neighborSum += texture2D(u_texture, texcoord + vec2(-texelSize.x, -texelSize.y)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(-texelSize.x, 0.0)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(-texelSize.x, texelSize.y)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(0.0, -texelSize.y)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(0.0, texelSize.y)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(texelSize.x, -texelSize.y)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(texelSize.x, 0.0)).r;
    neighborSum += texture2D(u_texture, texcoord + vec2(texelSize.x, texelSize.y)).r;

    // Apply the rules of Conway's Game of Life.
    if (center == 1.0) { // Living cell
        if (neighborSum < 2.0 || neighborSum > 3.0) {
            outColor = vec4(0.0, 0.0, 0.0, 1.0); // Dies
        } else {
            outColor = vec4(1.0, 1.0, 1.0, 1.0); // Lives
        }
    } else { // Dead cell
        if (neighborSum == 3.0) {
            outColor = vec4(1.0, 1.0, 1.0, 1.0); // Born
        } else {
            outColor = vec4(0.0, 0.0, 0.0, 1.0); // Remains dead
        }
    }
}
