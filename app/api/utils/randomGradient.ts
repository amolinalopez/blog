const gradients = ["gradient1", "gradient2", "gradient3", "gradient4"];

export function getRandomGradient() {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}
