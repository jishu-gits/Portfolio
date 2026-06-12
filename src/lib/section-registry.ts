export type SectionData = {
  id: string;
  element: HTMLElement | null;
  targetScrollOffset: number;
  sceneAssociation: string;
};

class SectionRegistryManager {
  private sections: Map<string, SectionData> = new Map();

  public register(id: string, element: HTMLElement | null, sceneAssociation: string) {
    if (!element) return;
    
    this.sections.set(id, {
      id,
      element,
      targetScrollOffset: element.offsetTop,
      sceneAssociation,
    });
  }

  public getSection(id: string): SectionData | undefined {
    return this.sections.get(id);
  }

  public getAll(): SectionData[] {
    return Array.from(this.sections.values());
  }

  public updateOffsets() {
    this.sections.forEach((section) => {
      if (section.element) {
        section.targetScrollOffset = section.element.offsetTop;
      }
    });
  }
}

export const SectionRegistry = new SectionRegistryManager();
