// This file is no longer used - the app now uses the FastAPI backend
// Kept for reference only

export interface MockDetectionResult {
  disease_name: string;
  confidence_score: string;
  severity_level: 'low' | 'medium' | 'high';
  disease_description: string;
  symptoms: string[];
  treatment_steps: string[];
  prevention_tips: string[];
}

const mockDiseases: { [key: string]: MockDetectionResult } = {
  'powdery_mildew': {
    disease_name: 'Powdery Mildew',
    confidence_score: '92.5',
    severity_level: 'medium',
    disease_description:
      'Powdery mildew is a fungal disease that appears as white or grayish powder on plant leaves, stems, and buds. It typically develops in warm, dry conditions with poor air circulation. The disease can spread rapidly and weaken plants by reducing their ability to photosynthesize.',
    symptoms: [
      'White or grayish powder on leaves and stems',
      'Leaves may become distorted or stunted',
      'Early leaf drop',
      'Reduced plant vigor',
      'Visible fungal coating on both leaf surfaces',
    ],
    treatment_steps: [
      'Remove heavily infected leaves and dispose of them properly (not in compost)',
      'Prune to improve air circulation around the plant',
      'Apply fungicide spray (sulfur or neem oil) every 7-10 days',
      'Spray both upper and lower leaf surfaces thoroughly',
      'Avoid overhead watering; water at the base of the plant',
      'Continue treatment for 3-4 weeks or until symptoms disappear',
    ],
    prevention_tips: [
      'Ensure good air circulation by spacing plants properly',
      'Water plants at soil level, not on foliage',
      'Avoid excessive nitrogen fertilizer',
      'Remove infected plant parts promptly',
      'Maintain proper humidity levels (below 50% if possible)',
      'Clean tools and equipment regularly',
      'Choose resistant plant varieties when available',
    ],
  },
  'leaf_spot': {
    disease_name: 'Leaf Spot',
    confidence_score: '88.3',
    severity_level: 'low',
    disease_description:
      'Leaf spot is a common fungal or bacterial disease characterized by small to large spots on plant leaves. These spots can vary in color, size, and shape depending on the pathogen. The disease is often spread by water splash from rain or watering.',
    symptoms: [
      'Small brown or dark spots on leaves',
      'Yellow halo surrounding the spots',
      'Spots may merge and cause larger dead areas',
      'Premature leaf drop',
      'Spotted appearance giving leaves a sickly look',
      'Spots may have visible rings or concentric patterns',
    ],
    treatment_steps: [
      'Remove all infected leaves as soon as symptoms appear',
      'Apply fungicide spray (copper-based or sulfur) weekly',
      'Improve air circulation and reduce leaf wetness',
      'Avoid splashing water on leaves during watering',
      'Mulch around plants to prevent soil splash',
      'Sanitize pruning tools between cuts',
      'Continue monitoring for 4-6 weeks',
    ],
    prevention_tips: [
      'Water only at the base of plants',
      'Space plants to ensure good air circulation',
      'Remove fallen leaves and debris',
      'Avoid touching wet plants',
      'Clean up plant debris from previous seasons',
      'Apply preventive fungicide in humid conditions',
      'Choose disease-resistant varieties when possible',
    ],
  },
  'rust': {
    disease_name: 'Rust',
    confidence_score: '85.7',
    severity_level: 'medium',
    disease_description:
      'Rust is a fungal disease that produces rust-colored pustules on plant leaves and stems. The disease thrives in warm, wet conditions and can severely weaken plants by interfering with photosynthesis. Different plant species host different rust pathogens.',
    symptoms: [
      'Rust-colored or orange pustules on leaf undersides',
      'Yellow or brown spots on upper leaf surface',
      'Powdery appearance when pustules break open',
      'Eventual yellowing and dropping of leaves',
      'Stunted plant growth',
      'Reduced vigor and productivity',
    ],
    treatment_steps: [
      'Remove all infected leaves and destroy them immediately',
      'Avoid overhead watering to reduce humidity',
      'Apply fungicide spray (sulfur or copper-based) every 10 days',
      'Ensure excellent air circulation',
      'Remove nearby susceptible plants if possible',
      'Treat early for best results',
      'Repeat applications for 4-6 weeks',
    ],
    prevention_tips: [
      'Space plants for good air circulation',
      'Water at the base of plants only',
      'Remove fallen leaves and plant debris',
      'Choose rust-resistant plant varieties',
      'Maintain proper plant nutrition and health',
      'Monitor plants regularly during susceptible seasons',
      'Apply preventive fungicide during humid weather',
    ],
  },
  'blight': {
    disease_name: 'Blight',
    confidence_score: '91.2',
    severity_level: 'high',
    disease_description:
      'Blight is a serious fungal or bacterial disease that causes rapid death of plant tissues. It can affect leaves, stems, and flowers, and can quickly devastate an entire plant or garden. Early detection and intervention are critical.',
    symptoms: [
      'Large areas of dead, blackened tissue',
      'Sudden wilting despite adequate water',
      'Rapid spread from one area to others',
      'Cankers on stems',
      'Flower and fruit rot',
      'General decline of plant health',
    ],
    treatment_steps: [
      'Immediately remove all infected plant parts and destroy them',
      'Cut back affected branches several inches below visible disease',
      'Sterilize pruning tools between cuts with 10% bleach solution',
      'Apply copper or sulfur fungicide to remaining plant',
      'Remove the entire plant if infection is severe',
      'Do not compost infected material',
      'Consider removing the plant if it cannot be saved',
    ],
    prevention_tips: [
      'Plant in well-draining soil',
      'Ensure excellent air circulation',
      'Avoid overhead watering',
      'Remove fallen leaves and debris promptly',
      'Choose resistant varieties when available',
      'Maintain plant health with proper care',
      'Quarantine new plants before adding to garden',
    ],
  },
};

function getRandomDisease(): MockDetectionResult {
  const diseases = Object.values(mockDiseases);
  return diseases[Math.floor(Math.random() * diseases.length)];
}

export function generateMockDetection(): MockDetectionResult {
  const disease = getRandomDisease();
  const confidenceVariation = (Math.random() - 0.5) * 10;
  const baseConfidence = parseFloat(disease.confidence_score);
  const adjustedConfidence = Math.max(70, Math.min(99, baseConfidence + confidenceVariation));

  return {
    ...disease,
    confidence_score: adjustedConfidence.toFixed(1),
  };
}

export async function simulateDetectionAPI(
  _file: File
): Promise<MockDetectionResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return generateMockDetection();
}
