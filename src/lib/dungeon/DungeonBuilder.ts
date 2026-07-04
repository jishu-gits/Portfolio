import * as THREE from 'three';
import { CellType } from './MazeGenerator';

export interface WallInstance {
  position: THREE.Vector3;
  scale: THREE.Vector3;
}

export class DungeonBuilder {
  blockSize: number;
  seed: number;
  private random: () => number;

  constructor(blockSize: number = 1, seed: number = 12345) {
    this.blockSize = blockSize;
    this.seed = seed;
    
    // Simple LCG for deterministic generation matching MazeGenerator
    let currentSeed = seed;
    this.random = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }

  buildWalls(grid: CellType[][]): WallInstance[] {
    const walls: WallInstance[] = [];
    const height = grid.length;
    if (height === 0) return walls;
    const width = grid[0].length;

    const offsetX = (width * this.blockSize) / 2;
    const offsetZ = (height * this.blockSize) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === CellType.Wall) {
          const posX = (x * this.blockSize) - offsetX + (this.blockSize / 2);
          const posZ = (y * this.blockSize) - offsetZ + (this.blockSize / 2);
          
          const rand = this.random();
          
          // Base thickness (width/depth) variations
          const w = (0.95 + this.random() * 0.15) * this.blockSize;
          const d = (0.95 + this.random() * 0.10) * this.blockSize;

          if (rand < 0.75) {
            // Standard Wall (1.8 to 2.2 height)
            const h = (1.8 + this.random() * 0.4) * this.blockSize;
            walls.push({
              position: new THREE.Vector3(posX, h / 2, posZ),
              scale: new THREE.Vector3(w, h, d)
            });
          } else if (rand < 0.90) {
            // Tall Wall (2.2 to 2.6 height)
            const h = (2.2 + this.random() * 0.4) * this.blockSize;
            walls.push({
              position: new THREE.Vector3(posX, h / 2, posZ),
              scale: new THREE.Vector3(w, h, d)
            });
          } else if (rand < 0.95) {
            // Broken Wall
            // Bottom piece
            const bottomH = (1.0 + this.random() * 0.4) * this.blockSize;
            walls.push({
              position: new THREE.Vector3(posX, bottomH / 2, posZ),
              scale: new THREE.Vector3(w, bottomH, d)
            });
            
            // Top piece
            const topH = (0.3 + this.random() * 0.3) * this.blockSize;
            const gap = 0.2 * this.blockSize;
            const topPosY = bottomH + gap + topH / 2;
            
            walls.push({
              position: new THREE.Vector3(posX, topPosY, posZ),
              scale: new THREE.Vector3(w * 0.9, topH, d * 0.9)
            });
          } else {
            // Pillar (thicker and taller)
            const h = (2.6 + this.random() * 0.4) * this.blockSize;
            const pw = (1.1 + this.random() * 0.1) * this.blockSize;
            walls.push({
              position: new THREE.Vector3(posX, h / 2, posZ),
              scale: new THREE.Vector3(pw, h, pw)
            });
          }
        }
      }
    }

    return walls;
  }
}
