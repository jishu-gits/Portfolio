type Listener = (section: string) => void;

class NavigationStateManager {
  private activeSection: string = "hero";
  private listeners: Set<Listener> = new Set();

  public getActiveSection(): string {
    return this.activeSection;
  }

  public setActiveSection(section: string) {
    if (this.activeSection !== section) {
      console.log(`[Navigation] Transition: ${this.activeSection} -> ${section}`);
      this.activeSection = section;
      this.notifyListeners();
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.activeSection);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.activeSection));
  }
}

export const NavigationState = new NavigationStateManager();
