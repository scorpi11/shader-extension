uniform sampler2D tex;
uniform int width;
uniform int height;

void main(void) {
  vec2 coord = cogl_tex_coord0_in.xy;

  vec4 color = vec4(0);
    const vec2 green = vec2(1, 0);
    //const vec2 blue  = vec2(0, 0.49);
    //const vec2 red   = vec2(0.49, 0);
    //const vec2 green = vec2(0, 0);
    const vec2 blue  = vec2(0, 0);
    const vec2 red   = vec2(0, 0);

    vec2 resolution = 1.0 / vec2(width, height);

    vec2 greencoord = coord + green * resolution;
    vec2 bluecoord  = coord + blue * resolution;
    vec2 redcoord   = coord + red * resolution;

    color.r += texture2D(tex, redcoord).r;
    color.g += texture2D(tex, greencoord).g;
    color.b += texture2D(tex, bluecoord).b;
    color.a += texture2D(tex, coord).a;
  
  cogl_color_out = color;
}
