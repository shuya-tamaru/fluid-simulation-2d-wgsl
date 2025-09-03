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

fn random(x: u32) -> f32 {
  return fract(sin(f32(x) * 12.9898 + 78.233) * 43758.5453);
}

@group(0) @binding(0) var<uniform> res: Resolution;
@group(0) @binding(1) var<uniform> mouse: Mouse;
@group(0) @binding(2) var<storage> sitePositions: SitePositions;

@vertex
fn vs_main(input: VSIn) -> VSOut {
  var output: VSOut;
  output.pos = vec4<f32>(input.pos, 0.0, 1.0);
  return output;
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let uv = input.pos.xy / res.resolution;
  
  // アスペクト比を考慮したUV座標を計算
  let aspectRatio = res.resolution.x / res.resolution.y;
  let uvCorrected = vec2<f32>(uv.x * aspectRatio, uv.y);
  
  var minDistance = 1000000.0;
  var closestSiteIndex = 0u;
  
  // 最も近い母点を見つける
  for (var i = 0u; i < arrayLength(&sitePositions.sitePositions); i = i + 1u) {
    let sitePos = sitePositions.sitePositions[i];
    let sitePosCorrected = vec2<f32>(sitePos.x * aspectRatio, sitePos.y);
    let dist = distance(uvCorrected, sitePosCorrected);
    
    if (dist < minDistance) {
      minDistance = dist;
      closestSiteIndex = i;
    }
  }
  
  // この母点のセルに対する内接円の中心と半径を計算
  let sitePos = sitePositions.sitePositions[closestSiteIndex];
  let sitePosCorrected = vec2<f32>(sitePos.x * aspectRatio, sitePos.y);
  
  // 内接円の中心は母点の位置（簡易版）
  let circleCenter = sitePosCorrected;
  
  // 内接円の半径を計算：この母点から他のすべての母点との境界線までの最小距離
  var minDistanceToBoundary = 1000000.0;
  
  for (var i = 0u; i < arrayLength(&sitePositions.sitePositions); i = i + 1u) {
    if (i == closestSiteIndex) { continue; }
    
    let otherSitePos = sitePositions.sitePositions[i];
    let otherSitePosCorrected = vec2<f32>(otherSitePos.x * aspectRatio, otherSitePos.y);
    
    // 2つの母点の中点（境界線）までの距離
    let midpoint = (sitePosCorrected + otherSitePosCorrected) * 0.5;
    let distToBoundary = distance(sitePosCorrected, midpoint);
    
    if (distToBoundary < minDistanceToBoundary) {
      minDistanceToBoundary = distToBoundary;
    }
  }
  
  // 内接円の半径
  let incircleRadius = minDistanceToBoundary;
  
  // 色の設定
  let r = floor(random(closestSiteIndex) * 3.0);
  var cellColor: vec3<f32>;
  if (r == 0.0) {
    cellColor = vec3<f32>(230.0 / 255.0, 0.0 / 255.0, 18.0 / 255.0); 
  } else if (r == 1.0) {
    cellColor = vec3<f32>(0.0 / 255.0, 104.0 / 255.0, 183.0 / 255.0);
  } else {
    cellColor = vec3<f32>(210.0 / 255.0, 215.0 / 255.0, 218.0 / 255.0);
  }
  
  // 目玉のオフセット（マウス位置に基づいて動かす）
  let mousePos = vec2<f32>(mouse.pos.x / res.resolution.x * aspectRatio, mouse.pos.y / res.resolution.y);
  let offsetDirection = normalize(mousePos - circleCenter);
  let maxOffset = incircleRadius * 0.3; // 内接円の30%の距離まで移動可能
  let offsetAmount = min(distance(mousePos, circleCenter), maxOffset);
  let eyeOffset = offsetDirection * offsetAmount * 0.5; // オフセット量を調整
  
  // 目玉の中心位置（オフセット適用）
  let eyeCenter = circleCenter + eyeOffset;
  
  // 各円のサイズ（内接円からの相対サイズ）
  let outerRadius = incircleRadius;           // 外側の円（元の色）
  let whiteRadius = incircleRadius * 0.6;     // 白い部分
  let blueRadius = incircleRadius * 0.3;      // 青い瞳孔
  
  // 現在のピクセルから各中心点までの距離
  let distFromOuterCenter = distance(uvCorrected, circleCenter);
  let distFromEyeCenter = distance(uvCorrected, eyeCenter);
  
  // 各円の描画
  let outerCircle = 1.0 - step(outerRadius, distFromOuterCenter);
  let whiteCircle = 1.0 - step(whiteRadius, distFromEyeCenter);
  let blueCircle = 1.0 - step(blueRadius, distFromEyeCenter);
  
  // 色の定義
  let whiteColor = vec3<f32>(1.0, 1.0, 1.0);
  let blueColor = vec3<f32>(0.0 / 255.0, 104.0 / 255.0, 183.0 / 255.0);
  let blackColor = vec3<f32>(1.0, 1.0, 1.0);
  
  // レイヤー合成（下から上へ）
  var finalColor = blackColor; // 背景
  finalColor = mix(finalColor, cellColor, outerCircle); // 外側の円
  finalColor = mix(finalColor, whiteColor, whiteCircle); // 白目
  finalColor = mix(finalColor, blueColor, blueCircle);   // 瞳孔
  
  return vec4<f32>(finalColor, 1.0);
}