export function createRandom2DPositions(positionCount: number) {
  const positions = new Float32Array(positionCount * 2); // 実際に必要な分だけ
  for (let i = 0; i < positionCount; i++) {
    positions[i * 2] = Math.random();
    positions[i * 2 + 1] = Math.random();
  }
  return positions;
}
