package amber.team.produkt.api;


import amber.team.produkt.model.ProductItem;
import amber.team.produkt.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
// import java.util.concurrent.atomic.AtomicBoolean;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductRepository productRepository;

    public ProductController(ProductRepository produktRepository) {
        this.productRepository = produktRepository;
    }
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> insertProductItem(@RequestBody ProductItem produktItem) {
        ProductItem item = productRepository.save(produktItem);
        return new ResponseEntity(item, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/read")
    public ResponseEntity<String> readProductItem(@RequestParam("profileId") String profileId, @RequestParam("productId") Optional<String> productId) {
        Optional<ArrayList<ProductItem>> items = productRepository.findItemByprofileId(profileId);

        List<ProductItem> profileItems = new ArrayList<>();
        if (items.isPresent()) {
            for (ProductItem item : items.get()) {
                if (item.getProfile().equals(profileId)) {
                    profileItems.add(item);
                }
            }
            if (productId.isPresent()) {
                for (ProductItem item : profileItems) {
                    if (item.getId().equals(productId.get())) {
                        return new ResponseEntity(item, HttpStatus.FOUND);
                    }
                }
            }
            return new ResponseEntity(profileItems, HttpStatus.FOUND);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<String> updateProductItem(@RequestParam("productId") String productId,
                                                    @RequestParam("profile") Optional<String> profile,
                                                    @RequestParam("title") Optional<String> title,
                                                    @RequestParam("description") Optional<String> description,
                                                    @RequestParam("category") Optional<ArrayList> category,
                                                    @RequestParam("price") Optional<Double> price,
                                                    @RequestParam("published") Optional<Boolean> published,
                                                    @RequestParam("sold") Optional<Boolean> sold,
                                                    @RequestBody Optional<String> image) { // Add sold as an Optional parameter
        Optional<ProductItem> item = productRepository.findById(productId);

        if (item.isPresent()) {
            ProductItem productItem = item.get();

            profile.ifPresent(productItem::setProfile);
            title.ifPresent(productItem::setTitle);
            description.ifPresent(productItem::setDescription);
            category.ifPresent(productItem::setCategory);
            price.ifPresent(productItem::setPrice);
            published.ifPresent(productItem::setPublished);
            sold.ifPresent(productItem::setSold); // Add this line to set the sold attribute if present

            if (image.isPresent()) {
                productItem.setImage(image.get());
            }
            productItem = productRepository.save(productItem);
            return new ResponseEntity(productItem, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProductItem(@RequestParam("productId") String productId) {
        Optional<ProductItem> item = productRepository.findById(productId);
        if (item.isPresent()) {
            productRepository.delete(item.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
    @CrossOrigin
    @GetMapping("/read/all")
    public ResponseEntity<String> readAllProducts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductItem> items = productRepository.findAll(pageable);

        if (items.hasContent()) {
            return new ResponseEntity(items.getContent(), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @GetMapping("/read/by-category")
    public ResponseEntity<String> readProductsByCategory(@RequestParam("category") String category,
                                                         @RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Optional<ArrayList<ProductItem>> items = productRepository.findItemByCategory(category);

        if (items.isPresent()) {
            ArrayList<ProductItem> filteredItems = new ArrayList<>(items.get());
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredItems.size());
            Page<ProductItem> pages = new PageImpl<>(filteredItems.subList(start, end), pageable, filteredItems.size());
            return new ResponseEntity(pages, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin
    @GetMapping("/read/published")
    public ResponseEntity<String> getPublishedProducts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                    @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductItem> items = productRepository.findByPublished(true, pageable);

        if (items.hasContent()) {
            return new ResponseEntity(items.getContent(), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


}
