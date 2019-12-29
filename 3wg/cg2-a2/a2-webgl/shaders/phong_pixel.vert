
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;

varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;

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
	 ecLightPosition = (modelViewMatrix * light.position).xyz;

//	color = lightColor;

	gl_Position  = projectionMatrix * vec4(ecPosition, 1.0);
}
