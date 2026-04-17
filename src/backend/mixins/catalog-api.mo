import List "mo:core/List";
import CatalogLib "../lib/catalog";
import Types "../types/catalog";

mixin (products : List.List<Types.Product>) {
  public query func getProducts() : async [Types.Product] {
    CatalogLib.getProducts(products);
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.Product {
    CatalogLib.getProduct(products, id);
  };

  public query func getCategories() : async [Text] {
    CatalogLib.getCategories(products);
  };
};
