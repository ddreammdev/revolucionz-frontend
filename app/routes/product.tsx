import {getProductBySlug} from '~/lib/product-data';
import {ProductView} from '~/components/product';
import {Header} from '~/components/layout';
import {Footer} from '~/components/layout';

export function meta({data}: {data: {product: ReturnType<typeof getProductBySlug>} | undefined}) {
  const product = data?.product;
  if (!product) {
    return [{title: 'Producto no encontrado | RevolucionZ'}];
  }
  return [
    {title: `${product.name} | RevolucionZ`},
    {name: 'description', content: product.description.slice(0, 160)},
  ];
}

export async function loader({params}: {params: {slug: string}}) {
  const product = getProductBySlug(params.slug);
  return {product};
}

export default function ProductPage({
  loaderData,
}: {
  loaderData: {product: ReturnType<typeof getProductBySlug>};
}) {
  const {product} = loaderData;

  if (!product) {
    return (
      <div>
        <Header />
        <div className="page-container">
          <div className="product-view">
            <header className="product-view-header">
              <a href="/" className="product-view-back">
                Volver a inicio
              </a>
            </header>
            <div className="product-view-not-found">
              <h1>Producto no encontrado</h1>
              <p>El producto que buscas no existe.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="page-container">
        <ProductView product={product} />
      </div>
      <Footer />
    </div>
  );
}