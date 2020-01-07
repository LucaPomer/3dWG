
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform mat4 viewMatrix;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec2 vertexTexcoords;

varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;
varying vec2 texcoords; // output to fragment shader

//material

struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

uniform Material material;

//lichtquellen
struct Light {
	vec4 position;
	vec3 color;
} ;
uniform Light light;

//ambientes licht
uniform vec3 ambientLight;


void main() {

	//ec = eye coordinates
	 ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;
	ecNormal = normalize(normalMatrix * vertexNormal);
	//ecNormal =vertexNormal;
	 ecLightPosition = (viewMatrix * light.position).xyz;

//	color = lightColor;
	texcoords = vertexTexcoords;//hand over textcoords to fragment shader
	gl_Position  = projectionMatrix * vec4(ecPosition, 1.0);
}
