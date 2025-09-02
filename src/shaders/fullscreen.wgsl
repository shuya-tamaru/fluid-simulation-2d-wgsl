struct VSIn {
  @location(0) pos: vec2<f32>
};

struct VSOut {
  @builtin(position) pos: vec4<f32>
};

struct Uniforms {
  resolution: vec2<f32>
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(input: VSIn) -> VSOut {
  var output: VSOut;
  output.pos = vec4<f32>(input.pos, 0.0, 1.0);
  return output;
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let uv = input.pos.xy / uniforms.resolution;
  return vec4<f32>(uv.x ,uv.y, 1.0, 1.0);
}
