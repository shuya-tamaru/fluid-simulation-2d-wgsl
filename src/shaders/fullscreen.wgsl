struct VSIn {
  @location(0) pos: vec2<f32>
};

struct VSOut {
  @builtin(position) pos: vec4<f32>
};

struct Resolution {
  resolution: vec2<f32>
};

struct Mouse {
  pos: vec2<f32>
};

@group(0) @binding(0) var<uniform> res: Resolution;
@group(0) @binding(1) var<uniform> mouse: Mouse;

@vertex
fn vs_main(input: VSIn) -> VSOut {
  var output: VSOut;
  output.pos = vec4<f32>(input.pos, 0.0, 1.0);
  return output;
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let uv = input.pos.xy / res.resolution;
  
  let mouseVis = mouse.pos / res.resolution;
  
  let debugColor = vec3<f32>(mouseVis.x, mouseVis.y, 0.0);
  
  // アスペクト比を考慮した円を描画
  let aspectRatio = res.resolution.x / res.resolution.y;
  let uvCorrected = vec2<f32>(uv.x * aspectRatio, uv.y);
  let mouseVisCorrected = vec2<f32>(mouseVis.x * aspectRatio, mouseVis.y);
  
  let dist = distance(uvCorrected, mouseVisCorrected);
  let circle = smoothstep(0.05, 0.03, dist);
  
  // 背景: マウス座標を色で表示 + 円
  let finalColor = mix(debugColor, vec3<f32>(1.0, 1.0, 1.0), circle);
  
  return vec4<f32>(finalColor, 1.0);
}
