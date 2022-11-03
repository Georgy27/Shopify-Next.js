import getAllProducts from '../framework/shopify/product/get-all-products';
import type { InferGetStaticPropsType } from 'next';
import { getConfig } from '../framework/shopify/api/configt';

export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60,
  };
}

const Home = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>{JSON.stringify(products)}</div>;
};

export default Home;
