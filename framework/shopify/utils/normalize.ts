import { ImageEdge, Product as ShopifyProduct } from '../schema';
import { Product } from '../../common/types/product';

const normalizeProductImages = ({ edges }: { edges: ImageEdge[] }) => {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return {
      url: `/images/${url}`,
      ...rest,
    };
  });
};

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    images,
    handle,
    vendor,
    description,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ''),
    images: normalizeProductImages(images),
    ...rest,
  };

  return product;
}
