import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Types "../types/catalog";

module {
  public type Product = Types.Product;

  public func getProducts(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func getProduct(products : List.List<Product>, id : Types.ProductId) : ?Product {
    products.find(func(p) { p.id == id });
  };

  public func getCategories(products : List.List<Product>) : [Text] {
    let seen = Set.empty<Text>();
    products.forEach(func(p) { seen.add(p.category) });
    seen.toArray();
  };

  public func seedProducts(products : List.List<Product>) : () {
    if (not products.isEmpty()) return;

    let seed : [Product] = [
      {
        id = 1;
        name = "Wireless Noise-Cancelling Headphones";
        description = "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.";
        price = 149.99;
        category = "Electronics";
        imageUrl = "https://picsum.photos/seed/headphones/400/300";
        stock = 42;
      },
      {
        id = 2;
        name = "Mechanical Keyboard";
        description = "Compact 75% mechanical keyboard with Cherry MX switches, per-key RGB lighting, and aluminium body.";
        price = 89.99;
        category = "Electronics";
        imageUrl = "https://picsum.photos/seed/keyboard/400/300";
        stock = 28;
      },
      {
        id = 3;
        name = "Classic Crew-Neck Sweatshirt";
        description = "Heavyweight 100% cotton fleece sweatshirt, pre-shrunk, available in a range of seasonal colours.";
        price = 39.95;
        category = "Clothing";
        imageUrl = "https://picsum.photos/seed/sweatshirt/400/300";
        stock = 120;
      },
      {
        id = 4;
        name = "Slim-Fit Chino Trousers";
        description = "Stretch-cotton chinos with a modern slim fit. Machine washable and wrinkle-resistant.";
        price = 54.95;
        category = "Clothing";
        imageUrl = "https://picsum.photos/seed/chinos/400/300";
        stock = 85;
      },
      {
        id = 5;
        name = "The Pragmatic Programmer";
        description = "20th Anniversary Edition. A landmark guide to software craftsmanship covering modern agile techniques and best practices.";
        price = 34.99;
        category = "Books";
        imageUrl = "https://picsum.photos/seed/pragprog/400/300";
        stock = 60;
      },
      {
        id = 6;
        name = "Clean Code";
        description = "Robert C. Martin's classic handbook on writing readable, maintainable, and elegant software.";
        price = 29.99;
        category = "Books";
        imageUrl = "https://picsum.photos/seed/cleancode/400/300";
        stock = 74;
      },
      {
        id = 7;
        name = "Bamboo Cutting Board Set";
        description = "Set of three eco-friendly bamboo cutting boards in small, medium, and large sizes with juice grooves.";
        price = 24.99;
        category = "Home";
        imageUrl = "https://picsum.photos/seed/cuttingboard/400/300";
        stock = 55;
      },
      {
        id = 8;
        name = "Adjustable Dumbbell Pair";
        description = "Space-saving adjustable dumbbells from 5 to 52.5 lbs each, with quick-change weight selector.";
        price = 299.00;
        category = "Sports";
        imageUrl = "https://picsum.photos/seed/dumbbells/400/300";
        stock = 15;
      },
    ];

    for (p in seed.values()) {
      products.add(p);
    };
  };
};
