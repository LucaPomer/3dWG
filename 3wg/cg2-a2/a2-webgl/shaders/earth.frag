uniform mat4 projectionMatrix;
uniform sampler2D earthDayTex;
uniform sampler2D earthCloudTex;
uniform sampler2D earthNightTex;
uniform sampler2D earthWaterTex;

varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;
varying vec2 texcoords;

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
	//return spec;
}
void main() {


	vec3 texColorWorld = texture2D(earthDayTex, texcoords).rgb;
	vec3 texColorClouds = texture2D(earthCloudTex, texcoords).rgb;
	vec3 texColorNight = texture2D(earthNightTex, texcoords).rgb;
	vec3 texWater = texture2D(earthWaterTex, texcoords).rgb;
	float shininess;

	vec3 viewDir = projectionMatrix[2][3] == 0.0 ? vec3(0, 0, 1) : normalize(-ecPosition);
	vec3 colorLight = phong(ecPosition, viewDir, ecNormal, ecLightPosition, light.color);


	vec3 colorTex = 0.5*(texColorWorld+texColorClouds);
	//vec3 colorWithLight = (colorLight*colorTex).xyz;

	vec3 normalizedLight = normalize(ecLightPosition);
	float cos_angle = dot(normalizedLight, ecNormal);

	cos_angle = max(-1.0, cos_angle);
	cos_angle = min(1.0, cos_angle);

	vec3 colorNightMix = mix(texColorNight,texColorWorld,cos_angle);
	vec3 colorWithLight;
	//land
	if(texWater.x!=0.0){
		colorWithLight  = mix(colorLight,colorNightMix,0.8);
	}
	//water
	else{
		colorWithLight  = mix(colorLight,colorNightMix,1.0);
	}

	//land

		gl_FragColor = vec4(colorWithLight, 1.0);


}
