import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    stock : Nat;
  };
};
