export interface AutoAdvanceState {
  userPaused: boolean
  hovered: boolean
  focusWithin: boolean
  documentHidden: boolean
  reducedMotion: boolean
}

export function wrapProjectIndex(index: number, length: number): number {
  if (length <= 0) throw new Error("Project length must be positive")
  return ((index % length) + length) % length
}

export function canAutoAdvance(state: AutoAdvanceState): boolean {
  return !Object.values(state).some(Boolean)
}
