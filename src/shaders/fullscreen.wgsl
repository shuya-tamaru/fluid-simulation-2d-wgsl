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

struct Uniforms {
  color1: vec4<f32>,
  color2: vec4<f32>,
  color3: vec4<f32>,
  gridCount: f32,
  moveStrength: f32,
  _pad0: f32,
  _pad1: f32,
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

fn getRandomColorIndex(gridPos: vec2<f32>) -> u32 {
  let hash = dot(gridPos, vec2<f32>(127.1, 311.7));
  let sinValue = sin(hash) * 43758.5453;
  let fractValue = fract(sinValue);
  return u32(floor(fractValue * 3.0)); // 0, 1, 2 のいずれか
}

fn getGridColor(colorIndex: u32) -> vec3<f32> {
  switch (colorIndex) {
    case 0u: {
      return vec3<f32>(ufs.color1.r / 255.0, ufs.color1.g / 255.0, ufs.color1.b / 255.0); // Human(赤)：#E60012
    }
    case 1u: {
      return vec3<f32>(ufs.color2.r / 255.0, ufs.color2.g / 255.0, ufs.color2.b / 255.0); // Nature(青)：#0068B7
    }
    default: {
      return vec3<f32>(ufs.color3.r / 255.0, ufs.color3.g / 255.0, ufs.color3.b / 255.0); // System(銀)：#D2D7DA
    }
  }
}

@group(0) @binding(0) var<uniform> res: Resolution;
@group(0) @binding(1) var<uniform> mouse: Mouse;
@group(0) @binding(2) var<uniform> ufs: Uniforms;
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


  let ruv = fixed_uv * ufs.gridCount;
  let gridPos = floor(ruv);
  var gridCoord: vec2<f32> = fract(ruv);
  gridCoord -= 0.5;

  let mouseUV     = mouse.pos / res.resolution;
  let mouseFixed  = vec2<f32>(mouseUV.x * aspectRatio, mouseUV.y);
  let mouseRUv    = mouseFixed * ufs.gridCount;
  let mouseLocal  = (mouseRUv - gridPos) - 0.5;

  var d1 = 1e9;
  var d2 = 1e9;
  var winnerCell = gridPos;
  var winnerSiteLocal = vec2<f32>(0.0, 0.0);

  for (var i = -1.0; i <= 1.0; i += 1.0) {
    for (var j = -1.0; j <= 1.0; j += 1.0) {
      let adj = vec2<f32>(i, j);

      var site = adj;
      let n = noise2d(gridPos + adj);
      site += sin(ts.timeStep * 0.003 * (n+0.1)) * ufs.moveStrength;

      let dist = length(gridCoord - site);

      if (dist < d1) {
        d2 = d1;
        d1 = dist;
        winnerCell = gridPos + adj;
        winnerSiteLocal = site;
      } else if (dist < d2) {
        d2 = dist;
      }
    }
  }

  // セルのベース色
  let colorIndex = getRandomColorIndex(winnerCell);
  var color = getGridColor(colorIndex);

  // ===== 目（輪郭なし：白目＋青い瞳のみ） =====
  // 白目（中心＝勝者サイト）
  let rS = length(gridCoord - winnerSiteLocal);
  let scleraR = 0.28;
  let aaS = max(0.001, fwidth(rS));  
  let underS = 1.0 - step(scleraR + aaS, rS);  
  color = mix(color, vec3<f32>(1.0), underS);      
  let scleraMask = 1.0 - smoothstep(scleraR, scleraR + aaS, rS);
  color = mix(color, vec3<f32>(1.0), scleraMask); // 白

  // 偏心方向（セル依存で安定）
  var dir = mouseLocal - winnerSiteLocal;
  dir = dir / max(length(dir), 1e-4);
  let irisOffset = 0.1;
  let irisCenter = winnerSiteLocal + dir * irisOffset;

  // 青い瞳（輪郭なし）
  let irisColor = vec3<f32>(0.0/255.0, 104.0/255.0, 183.0/255.0); // #0068B7
  let rI = length(gridCoord - irisCenter);
  let irisR = 0.15;
  let aaI = max(0.001, fwidth(rI));
  let irisMask = 1.0 - smoothstep(irisR, irisR + aaI, rI);
  color = mix(color, irisColor, irisMask);        // 青

  // ===== Voronoi 境界：くっきり白（二値） =====
  let lineWidth = 0.02;
  let borderMask = 1.0 - step(lineWidth, d2 - d1); // 0/1
  color = mix(color, vec3<f32>(1.0), borderMask);

  return vec4<f32>(color, 1.0);
}



