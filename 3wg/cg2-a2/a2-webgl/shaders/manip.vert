
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float simtime;
attribute vec3 vertexPosition;
void main() {
    vec3 simtimePos = vec3(vertexPosition[0],sin(simtime+(vertexPosition[2]))+vertexPosition[1],vertexPosition[2]);
    vec3 position = (simtimePos)+(simtime);
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(simtimePos, 1.0);
}
