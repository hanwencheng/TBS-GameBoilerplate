
export const createHero = (hero) => {
  return {
    type: 'Create_hero',
    hero: hero,
  }
}