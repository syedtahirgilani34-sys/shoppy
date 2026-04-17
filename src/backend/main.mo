import List "mo:core/List";
import Types "types/catalog";
import CatalogMixin "mixins/catalog-api";
import CatalogLib "lib/catalog";

actor {
  let products = List.empty<Types.Product>();

  CatalogLib.seedProducts(products);

  include CatalogMixin(products);
};
