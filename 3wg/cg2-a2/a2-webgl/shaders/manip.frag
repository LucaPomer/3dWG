
varying float simTimeValue;
void main() {

    gl_FragColor = vec4(abs(sin(simTimeValue)), abs(sin(simTimeValue)+0.3), abs(sin(simTimeValue)+0.25), 1.0);
    //	gl_FragColor.rgba = fragColor;
}