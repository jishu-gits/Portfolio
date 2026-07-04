import * as THREE from 'three';
import { CellType } from '@/lib/dungeon/MazeGenerator';
import { EnvironmentData, PropInstance } from './EnvironmentTypes';

export class EnvironmentGenerator {
  blockSize: number;
  seed: number;
  private random: () => number;

  constructor(blockSize: number = 1, seed: number = 12345) {
    this.blockSize = blockSize;
    this.seed = seed;
    
    let currentSeed = seed;
    this.random = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }

  generate(grid: CellType[][]): EnvironmentData {
    const data: EnvironmentData = {
      torches: [],
      largePillars: [],
      rubble: [],
      crates: [],
      barrels: [],
      debris: []
    };

    const height = grid.length;
    if (height === 0) return data;
    const width = grid[0].length;

    const offsetX = (width * this.blockSize) / 2;
    const offsetZ = (height * this.blockSize) / 2;

    const getPos = (x: number, y: number, heightOffset: number = 0) => {
      return new THREE.Vector3(
        (x * this.blockSize) - offsetX + (this.blockSize / 2),
        heightOffset,
        (y * this.blockSize) - offsetZ + (this.blockSize / 2)
      );
    };

    const isPath = (x: number, y: number) => {
      if (x < 0 || x >= width || y < 0 || y >= height) return false;
      return grid[y][x] === CellType.Path;
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!isPath(x, y)) continue;

        const pos = getPos(x, y);

        // Count path neighbors
        const nN = isPath(x, y - 1);
        const nS = isPath(x, y + 1);
        const nW = isPath(x - 1, y);
        const nE = isPath(x + 1, y);
        
        const neighbors = [nN, nS, nW, nE].filter(Boolean).length;

        // Debris: scattered randomly along paths
        if (this.random() < 0.2) { 
          const numDebris = Math.floor(this.random() * 3) + 1;
          for (let i = 0; i < numDebris; i++) {
            const dpX = pos.x + (this.random() - 0.5) * this.blockSize * 0.8;
            const dpZ = pos.z + (this.random() - 0.5) * this.blockSize * 0.8;
            const ds = 0.05 + this.random() * 0.1;
            data.debris.push({
              position: new THREE.Vector3(dpX, ds / 2, dpZ),
              rotation: new THREE.Euler(this.random() * Math.PI, this.random() * Math.PI, this.random() * Math.PI),
              scale: new THREE.Vector3(ds, ds, ds)
            });
          }
        }

        if (neighbors === 1) {
          // Dead End
          if (this.random() < 0.6) { // 60% chance for crates in dead end
            const s = 0.35 + this.random() * 0.15;
            // Shift towards the end wall
            let cx = pos.x;
            let cz = pos.z;
            if (nN) cz += 0.2;
            if (nS) cz -= 0.2;
            if (nW) cx += 0.2;
            if (nE) cx -= 0.2;

            data.crates.push({
              position: new THREE.Vector3(cx, s / 2, cz),
              rotation: new THREE.Euler(0, this.random() * Math.PI / 2, 0),
              scale: new THREE.Vector3(s, s, s)
            });
            // 70% chance of a barrel near the crate
            if (this.random() < 0.7) {
              const br = 0.12 + this.random() * 0.05;
              const bh = 0.35 + this.random() * 0.1;
              data.barrels.push({
                position: new THREE.Vector3(cx + (this.random() > 0.5 ? 0.3 : -0.3), bh / 2, cz + (this.random() > 0.5 ? 0.3 : -0.3)),
                rotation: new THREE.Euler(0, this.random() * Math.PI, 0),
                scale: new THREE.Vector3(br * 2, bh, br * 2) // scale for cylinder (diameter, height, diameter)
              });
            }
          }
        } else if (neighbors === 2) {
          // Corridor or Corner
          const isStraight = (nN && nS) || (nW && nE);
          
          if (isStraight) {
            // Torches on walls
            if (data.torches.length < 16) {
              if (nN && nS && (y % 3 === 0)) { // Spacing
                const isWest = this.random() > 0.5;
                if (isWest && !isPath(x - 1, y)) {
                  data.torches.push({
                    position: new THREE.Vector3(pos.x - this.blockSize * 0.45, 1.2, pos.z),
                    rotation: new THREE.Euler(0, Math.PI / 2, 0),
                    scale: new THREE.Vector3(1, 1, 1)
                  });
                } else if (!isWest && !isPath(x + 1, y)) {
                  data.torches.push({
                    position: new THREE.Vector3(pos.x + this.blockSize * 0.45, 1.2, pos.z),
                    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
                    scale: new THREE.Vector3(1, 1, 1)
                  });
                }
              } else if (nW && nE && (x % 3 === 0)) {
                const isNorth = this.random() > 0.5;
                if (isNorth && !isPath(x, y - 1)) {
                  data.torches.push({
                    position: new THREE.Vector3(pos.x, 1.2, pos.z - this.blockSize * 0.45),
                    rotation: new THREE.Euler(0, 0, 0),
                    scale: new THREE.Vector3(1, 1, 1)
                  });
                } else if (!isNorth && !isPath(x, y + 1)) {
                  data.torches.push({
                    position: new THREE.Vector3(pos.x, 1.2, pos.z + this.blockSize * 0.45),
                    rotation: new THREE.Euler(0, Math.PI, 0),
                    scale: new THREE.Vector3(1, 1, 1)
                  });
                }
              }
            }
          } else {
            // Corner
            if (this.random() < 0.4) {
              // Rubble in corner
              const s = 0.2 + this.random() * 0.2;
              data.rubble.push({
                position: new THREE.Vector3(pos.x + (this.random() - 0.5)*0.3, s / 2, pos.z + (this.random() - 0.5)*0.3),
                rotation: new THREE.Euler(this.random(), this.random(), this.random()),
                scale: new THREE.Vector3(s, s, s)
              });
            }
          }
        } else if (neighbors >= 3) {
          // Intersection
          if (this.random() < 0.5) {
            // Support Pillar in the intersection
            const s = 0.25; // Thin enough to walk around
            data.largePillars.push({
              position: new THREE.Vector3(pos.x, 1.5, pos.z),
              rotation: new THREE.Euler(0, 0, 0),
              scale: new THREE.Vector3(s, 3.0, s)
            });
          }
        }
      }
    }

    return data;
  }
}
