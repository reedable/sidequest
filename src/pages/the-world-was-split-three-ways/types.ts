export type Character = 'hades' | 'poseidon' | 'zeus'
export type StrawLength = 'short' | 'medium' | 'long'

export interface SimulationStats {
  rounds: number
  sky: { hades: number; poseidon: number; zeus: number }
}

export const characters = [
  {
    id: 'hades' as Character,
    name: 'Hades',
    emoji: '🌑',
    domain: 'The Underworld',
    drawPosition: 'Draws first',
  },
  {
    id: 'poseidon' as Character,
    name: 'Poseidon',
    emoji: '🌊',
    domain: 'The Sea',
    drawPosition: 'Draws second',
  },
  {
    id: 'zeus' as Character,
    name: 'Zeus',
    emoji: '☁️',
    domain: 'The Sky',
    drawPosition: 'Draws last',
  },
]
