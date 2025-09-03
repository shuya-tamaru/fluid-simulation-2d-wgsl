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

struct SitePositions {
  sitePositions: array<vec2<f32>>
};

struct TimeStep {
  timeStep: f32,
  _pad0: f32, 
  _pad1: f32,
  _pad2: f32
};

fn noise2d(pos: vec2<f32>) -> vec2<f32> {
   let x =  dot(pos, vec2<f32>(123.4, 234.5));
   let y =  dot(pos, vec2<f32>(345.6, 456.7));
   var noise = vec2<f32>(x, y);
   noise = sin(noise);
   noise = noise * 43758.5453;
   noise = fract(noise);
   return noise;
}

@group(0) @binding(0) var<uniform> res: Resolution;
@group(0) @binding(1) var<uniform> mouse: Mouse;
@group(0) @binding(2) var<storage> sitePositions: SitePositions;
@group(0) @binding(3) var<uniform> ts: TimeStep;

@vertex
fn vs_main(input: VSIn) -> VSOut {
  var output: VSOut;
  output.pos = vec4<f32>(input.pos, 0.0, 1.0);
  return output;
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let aspectRatio = res.resolution.x / res.resolution.y;
  let uv = input.pos.xy / res.resolution;
  let fixed_uv = vec2<f32>(uv.x * aspectRatio, uv.y);
  
  let ruv = fixed_uv * 4.0;
  let gridPos = floor(ruv);
  var gridCoord: vec2<f32> = fract(ruv);

  var color: vec3<f32>;
  gridCoord -= 0.5;

  var griduv: vec2<f32> = abs(gridCoord);
  var distanceToEdgeOfGridCell: f32 = 2.0 * max(griduv.x, griduv.y);

  // color = vec3<f32>(smoothstep(0.99, 1.0, distanceToEdgeOfGridCell),0.0,0.0);

  var pointsOnGrid = 0.0;
  var minDistFromPixel = 100.0;

  for (var i = -1.0; i <= 1.0; i += 1.0) {
    for (var j = -1.0; j <= 1.0; j += 1.0) {
      var adjGridCoords: vec2<f32> = vec2<f32>(i,j);
      var pointOnAdGrid: vec2<f32> = adjGridCoords;
      var noise = noise2d(gridPos + pointOnAdGrid);
      pointOnAdGrid = pointOnAdGrid + sin(ts.timeStep * 0.001 * noise) * 0.5;
      var dist = length(gridCoord - pointOnAdGrid);
      minDistFromPixel = min(minDistFromPixel, dist);
      pointsOnGrid += smoothstep(0.95, 0.96, 1.0 - dist);
    }
  }

  var pointsOnGridColor = vec3<f32>(pointsOnGrid);;
  color = color + minDistFromPixel;


  return vec4<f32>(color, 1.0);
}