
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;

varying vec3 color;

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

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lp, vec3 lc) {
	// derived vectors
	vec3 toLight = normalize(lp - p);
	vec3 reflectLight = reflect(-toLight, n);

	// scalar products
	float ndots = max(dot(toLight, n), 0.0);
	float rdotv = max(dot(reflectLight, v), 0.0);

	// phong sum
	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = material.diffuse * ndots * lc;
	vec3 spec = material.specular *
	pow(rdotv, material.shininess) * lc;
	return ambi + diff + spec;
	//return ambi;
}
void main() {

	//ec = eye coordinates
	vec3 ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;
	vec3 ecNormal   = normalize(normalMatrix * vertexNormal);

	vec3 ecLightPosition = (modelViewMatrix * light.position).xyz;
	vec3 viewDir = projectionMatrix[2][3] == 0.0 ? vec3(0, 0, 1) : normalize(-ecPosition);
	color = phong(ecPosition, viewDir, ecNormal, ecLightPosition, light.color);


//	color = lightColor;

	gl_Position  = projectionMatrix * vec4(ecPosition, 1.0);
}
