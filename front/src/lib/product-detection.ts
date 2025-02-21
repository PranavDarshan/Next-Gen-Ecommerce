// Mock product database
const productDatabase = [
  {
    id: '1',
    name: 'Organic Banana',
    price: 0.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    stock: 150,
    nutrition: {
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3
    },
    reviews: [
      { id: '1', rating: 5, comment: 'Great quality!', userName: 'John D.', date: '2024-03-10' }
    ]
  },
  {
    id: '2',
    name: 'Fresh Apples',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    stock: 200,
    nutrition: {
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3
    },
    reviews: [
      { id: '2', rating: 4, comment: 'Very fresh!', userName: 'Alice M.', date: '2024-03-11' }
    ]
  }
];

// Simulates product detection from an image
export async function detectProduct(imageData: string) {
  // In a real application, this would use computer vision/ML to detect the product
  // For demo purposes, we'll return a random product from our database
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  return productDatabase[Math.floor(Math.random() * productDatabase.length)];
}