export type FocusTarget = 'Overview' | 'Generation' | 'Torches' | 'Pillars' | 'DeadEnds' | 'Exit';

export const PresentationState = {
  currentFocus: 'Overview' as FocusTarget,
  isGenerating: false,
  generationProgress: 1.0, // 0 to 1
  isDeveloperMode: false
};
