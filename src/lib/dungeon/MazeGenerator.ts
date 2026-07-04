export enum CellType {
  Wall = 1,
  Path = 0
}

export class MazeGenerator {
  width: number;
  height: number;
  grid: CellType[][];
  random: () => number;

  constructor(width: number, height: number, seed: number = 12345) {
    // Ensure dimensions are odd for proper maze generation with walls
    this.width = width % 2 === 0 ? width + 1 : width;
    this.height = height % 2 === 0 ? height + 1 : height;
    this.grid = [];
    
    // Simple LCG for deterministic randomness
    let currentSeed = seed;
    this.random = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }

  generate(): CellType[][] {
    // Initialize grid with walls
    for (let y = 0; y < this.height; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = CellType.Wall;
      }
    }

    // Start carving from (1, 1)
    this.carvePassagesFrom(1, 1);
    
    return this.grid;
  }

  private carvePassagesFrom(cx: number, cy: number) {
    this.grid[cy][cx] = CellType.Path;

    const directions = [
      [0, -2], // Up
      [0, 2],  // Down
      [-2, 0], // Left
      [2, 0]   // Right
    ];

    // Shuffle directions deterministically
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      // Check bounds to prevent going outside grid
      if (nx > 0 && nx < this.width - 1 && ny > 0 && ny < this.height - 1) {
        if (this.grid[ny][nx] === CellType.Wall) {
          // Carve through the wall
          this.grid[cy + dy / 2][cx + dx / 2] = CellType.Path;
          this.carvePassagesFrom(nx, ny);
        }
      }
    }
  }
}
