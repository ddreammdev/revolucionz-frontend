import imgAdelgazate from '~/assets/products/adelgazate.avif';
import imgColageno from '~/assets/products/colageno.avif';
import imgDetoxZ from '~/assets/products/detox-z.avif';
import imgDivaz from '~/assets/products/divaz.avif';
import imgEroz from '~/assets/products/eroz.avif';
import imgGlutationDp from '~/assets/products/glutation-doypack.avif';
import imgGlutation from '~/assets/products/glutation.avif';
import imgHepaZ from '~/assets/products/hepa-z.avif';
import imgRevitalizateDp from '~/assets/products/revitalizate-doypack.avif';

export interface Product {
  id: number;
  name: string;
  slug: string;
  img: string;
  price: number;
  category: string;
  description: string;
  benefits: string[];
  format: string;
  howToUse: string;
  rating: number;
  ratingCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Adelgazate',
    slug: 'adelgazate',
    img: imgAdelgazate,
    price: 29.99,
    category: 'Quemadores',
    description:
      'Adelgazate es un quemador de grasa avanzado diseñado para acelerar el metabolismo y potenciar la quema de calorías. Con ingredientes termogénicos naturales, te ayuda a alcanzar tus objetivos de pérdida de peso de forma segura y efectiva.',
    benefits: [
      'Acelera el metabolismo basal',
      'Aumenta la termogénesis natural',
      'Reduce la retención de líquidos',
      'Proporciona energía sostenida sin nerviosismo',
    ],
    format: '30 cápsulas',
    howToUse: 'Tomar 1 cápsula 30 minutos antes del desayuno y 1 cápsula antes del almuerzo.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 2,
    name: 'Revitalizate',
    slug: 'revitalizate',
    img: imgColageno,
    price: 34.99,
    category: 'Salud',
    description:
      'Colágeno hidrolizado de alta pureza para el cuidado de tus articulaciones, piel y uñas. Formulado con péptidos bioactivos que favorecen la regeneración del tejido conectivo y la elasticidad de la piel.',
    benefits: [
      'Fortalece uñas y cabello',
      'Mejora la elasticidad e hidratación de la piel',
      'Protege las articulaciones y cartílagos',
      'Alta absorción gracias a su bajo peso molecular',
    ],
    format: '300 gramos en polvo',
    howToUse: 'Disolver 1 scoop (10g) en 250ml de agua o tu bebida favorita. Consumir una vez al día.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 3,
    name: 'Detox-Z',
    slug: 'detox-z',
    img: imgDetoxZ,
    price: 27.99,
    category: 'Quemadores',
    description:
      'Detox-Z es un suplemento desintoxicante que ayuda a depurar tu organismo de toxinas y metales pesados. Su fórmula con antioxidantes naturales favorece la limpieza del hígado y mejora tu bienestar general.',
    benefits: [
      'Elimina toxinas y metales pesados',
      'Fortalece el sistema inmunológico',
      'Mejora la digestión y reduce la inflamación',
      'Aumenta los niveles de energía natural',
    ],
    format: '60 cápsulas',
    howToUse: 'Tomar 2 cápsulas al día con abundante agua, preferiblemente en ayunas.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 4,
    name: 'Divaz',
    slug: 'divaz',
    img: imgDivaz,
    price: 31.99,
    category: 'Vitaminas',
    description:
      'Divaz es un complejo multivitamínico especialmente formulado para la mujer moderna. Con vitaminas, minerales y extractos botánicos que apoyan el equilibrio hormonal, la energía y la vitalidad en cada etapa de la vida.',
    benefits: [
      'Equilibrio hormonal y bienestar femenino',
      'Aporte completo de vitaminas y minerales esenciales',
      'Mejora la energía y reduce la fatiga',
      'Fortalece el sistema inmunológico',
    ],
    format: '60 cápsulas',
    howToUse: 'Tomar 1 cápsula al día con el desayuno.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 5,
    name: 'Eroz',
    slug: 'eroz',
    img: imgEroz,
    price: 36.99,
    category: 'Pre-Entreno',
    description:
      'Eroz es un pre-entreno explosivo diseñado para llevar tu rendimiento al máximo. Con una mezcla sinérgica de cafeína, beta-alanina y citrulina, te proporciona energía intensa, enfoque mental y bombas musculares inigualables.',
    benefits: [
      'Explosión de energía y enfoque mental',
      'Mejora el flujo sanguíneo y las bombas musculares',
      'Retrasa la fatiga muscular',
      'Aumenta la fuerza y el rendimiento deportivo',
    ],
    format: '300 gramos en polvo',
    howToUse: 'Mezclar 1 scoop (10g) en 250ml de agua. Consumir 20-30 minutos antes del entrenamiento.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 6,
    name: 'Glutation-Z Doypack',
    slug: 'glutation-z-doypack',
    img: imgGlutationDp,
    price: 39.99,
    category: 'Salud',
    description:
      'Glutation en presentación doypack es el antioxidante maestro por excelencia. Protege tus células del daño oxidativo, fortalece tu sistema inmune y promueve una desintoxicación profunda a nivel celular.',
    benefits: [
      'Potente acción antioxidante celular',
      'Fortalece el sistema inmunológico',
      'Apoya la desintoxicación del hígado',
      'Retrasa el envejecimiento prematuro',
    ],
    format: '200 gramos en polvo (Doypack)',
    howToUse: 'Disolver 1 scoop (5g) en agua o jugo. Tomar una vez al día en ayunas.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 7,
    name: 'Glutation-Z',
    slug: 'glutation-z',
    img: imgGlutation,
    price: 37.99,
    category: 'Salud',
    description:
      'Glutation en cápsulas es el antioxidante intracelular más importante del organismo. Ayuda a neutralizar radicales libres, fortalecer el sistema inmune y promover la regeneración de otros antioxidantes como las vitaminas C y E.',
    benefits: [
      'Neutraliza radicales libres y estrés oxidativo',
      'Fortalece las defensas del organismo',
      'Apoya la salud hepática',
      'Favorece la regeneración antioxidante',
    ],
    format: '60 cápsulas',
    howToUse: 'Tomar 1 cápsula al día con el estómago vacío.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 8,
    name: 'Hepa-Z',
    slug: 'hepa-z',
    img: imgHepaZ,
    price: 28.99,
    category: 'Salud',
    description:
      'Hepa-Z es un suplemento hepatoprotector formulado con cardo mariano, alcachofa y otros extractos naturales que favorecen la salud del hígado y la vesícula biliar. Ideal para quienes buscan depurar y proteger su hígado.',
    benefits: [
      'Protege y regenera las células hepáticas',
      'Facilita la digestión de grasas',
      'Ayuda en la desintoxicación del organismo',
      'Reduce la inflamación hepática',
    ],
    format: '60 cápsulas',
    howToUse: 'Tomar 1 cápsula antes del almuerzo y 1 antes de la cena.',
    rating: 0,
    ratingCount: 0,
  },
  {
    id: 9,
    name: 'Revitalizate Doypack',
    slug: 'revitalizate-doypack',
    img: imgRevitalizateDp,
    price: 32.99,
    category: 'Vitaminas',
    description:
      'Revitalizate es un complejo revitalizante en polvo con vitaminas del grupo B, magnesio y coenzima Q10. Diseñado para recuperar tu energía física y mental, combatir el cansancio y mejorar tu rendimiento diario.',
    benefits: [
      'Recupera la energía física y mental',
      'Combate el cansancio y la fatiga crónica',
      'Mejora la concentración y el enfoque',
      'Aporte completo de vitaminas del grupo B',
    ],
    format: '300 gramos en polvo (Doypack)',
    howToUse: 'Disolver 1 scoop (10g) en 250ml de agua. Consumir por la mañana o antes del entrenamiento.',
    rating: 0,
    ratingCount: 0,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
