// Vertex shader program
export const vsSource = `
            attribute vec4 aVertexPosition;

            void main() {
                gl_Position = aVertexPosition;
            }
        `;

export function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return null;

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            "Unable to initialize the shader program: " +
                gl.getProgramInfoLog(shaderProgram),
        );
        return null;
    }

    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) {
        alert("Failed to create shader of type: " + type);
        return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            "An error occurred compiling the shaders: " +
                gl.getShaderInfoLog(shader),
        );
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

export function initBuffer(gl) {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Corrected vertex positions to cover the entire canvas.  Added comments to explain.
    const positions = [
        -1.0,
        1.0, // Top-left
        1.0,
        1.0, // Top-right
        -1.0,
        -1.0, // Bottom-left
        1.0,
        -1.0, // Bottom-right
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}
