export function createFullscreenQuad(device: GPUDevice) {
  // NDC座標で画面いっぱいの四角形
  // 左下(-1, -1), 右下(1, -1), 右上(1, 1), 左上(-1, 1)
  const vertices = new Float32Array([
    -1.0,
    -1.0, // 左下
    1.0,
    -1.0, // 右下
    1.0,
    1.0, // 右上
    -1.0,
    1.0, // 左上
  ]);

  // 2つの三角形で四角形を作成
  const indices = new Uint16Array([
    0,
    1,
    2, // 第1三角形
    0,
    2,
    3, // 第2三角形
  ]);

  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });
  new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
  vertexBuffer.unmap();

  const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });
  new Uint16Array(indexBuffer.getMappedRange()).set(indices);
  indexBuffer.unmap();

  const layout: GPUVertexBufferLayout = {
    arrayStride: 8, // vec2<f32> = 8 bytes
    attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }],
  };

  return { vertexBuffer, indexBuffer, indexCount: indices.length, layout };
}
