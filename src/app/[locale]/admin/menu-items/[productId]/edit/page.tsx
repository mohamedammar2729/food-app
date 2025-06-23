import { Pages, Routes } from '@/constants/enums';


import { redirect } from 'next/navigation';
import Form from '../../_components/Form';
import { getCategories } from '@/server/db/categories';
import { Locale } from '@/i18n-config';
import getTranslation from '@/lib/translation';
import { getProduct, getProducts } from '@/server/db/products';

// should generate static params because this page is dynamic route 

export async function generateStaticParams() {
  const products = await getProducts();

  // productId should match the folder name of the dynamic route
  return products.map((product) => ({ productId: product.id }));
}
async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) {
  const { productId, locale } = await params;
  const translations = await getTranslation(locale);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section>
        <div className='container'>
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
