import {
    initShaderProgram,
    vsSource,
    initBuffer,
} from "./load-shader";

document.addEventListener("DOMContentLoaded", async function () {
    setupCanvas();
    await main();
});

function setupCanvas() {
    const canvas = document.getElementById("glCanvas");
    window.canvas = canvas

    window.gl = canvas?.getContext("webgl");

    if (!gl) {
        canvas.style.display = "hidden";
        // alert("Unable to initialize WebGL. Your browser may not support it.");
        throw new Error("WebGL initialization failed");
    }
}

var PROGRAM_INFO;

async function main() {
    const fsSource = await (
        await fetch("/js/shader/coloured_tiles.frag", {
            with: {
                type: "text/plain",
            },
        })
    ).text();
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) {
        throw new Error("Failed to initialize shader program");
    }

    PROGRAM_INFO = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(
                shaderProgram,
                "aVertexPosition",
            ),
        },
        uniformLocations: {
            resolution: gl.getUniformLocation(shaderProgram, "u_resolution"), // Get uniform location
            color: gl.getUniformLocation(shaderProgram, "u_color"), // Get uniform location
        },
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height); // Set the viewport to match the canvas size. This is CRUCIAL.
        drawScene(gl, PROGRAM_INFO); // Call drawScene after resize to ensure correct rendering
    }
    // Initial draw and resize handling
    resizeCanvas(); // Call resizeCanvas to set initial size and draw
    window.addEventListener("resize", resizeCanvas); // Set up resize listener
}

function drawScene(gl, programInfo) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // Standard alpha blending

    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    {
        const positionBuffer = initBuffer(gl);
        const numComponents = 2; // pull out 2 values per iteration
        const type = gl.FLOAT; // the data in the buffer is 32bit floats
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0; // how many bytes inside the buffer to start from
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset,
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    gl.useProgram(programInfo.program);

    // Set the uniform value for u_resolution.
    gl.uniform2f(
        programInfo.uniformLocations.resolution,
        canvas.width,
        canvas.height,
    );

    // Set the uniform value for u_color.
    if (accentColor) {
        const rgb = window.accentColor.get().rgb;
        gl.uniform3f(programInfo.uniformLocations.color, ...rgb);
    }

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}
