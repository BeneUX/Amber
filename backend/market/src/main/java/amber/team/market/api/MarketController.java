package amber.team.market.api;


import amber.team.market.model.MarketItem;
import amber.team.market.repository.MarketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;


import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@RestController
@CrossOrigin
@RequestMapping("/markets")
public class MarketController {
    private static final Logger logger = LoggerFactory.getLogger(MarketController.class);
    private final MarketRepository marketRepository;

    public MarketController(MarketRepository marketRepository) {
        this.marketRepository = marketRepository;
    }
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> insertMarketItem(@RequestBody MarketItem marketItem) {
        MarketItem item = marketRepository.save(marketItem);
        return new ResponseEntity(item, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/read")
    public ResponseEntity<String> findItemByProductId(@RequestParam("productId") String productId) {
        Optional<MarketItem> item = marketRepository.findById(productId);

        if (item.isPresent()) {
            return new ResponseEntity(item.get(), HttpStatus.FOUND);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @CrossOrigin
    @GetMapping("/read/all")
    public ResponseEntity<String> readAllMarkets(@RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MarketItem> items = marketRepository.findAll(pageable);

        if (items.hasContent()) {
            return new ResponseEntity(items.getContent(), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> updateProductItem(@RequestParam("productId") String productId, @RequestParam("profile") Optional<String> profile, @RequestParam("title") Optional<String> title, @RequestParam("description") Optional<String> description, @RequestParam("category") Optional<ArrayList> category, @RequestParam("price") Optional<Double> price) {
        Optional<MarketItem> item = marketRepository.findById(productId);

        if (item.isPresent()) {
            MarketItem productItem = item.get();
            profile.ifPresent(productItem::setProfile);
            title.ifPresent(productItem::setTitle);
            description.ifPresent(productItem::setDescription);
            category.ifPresent(productItem::setCategory);
            price.ifPresent(productItem::setPrice);

            productItem = marketRepository.save(productItem);
            return new ResponseEntity(productItem, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProductItem(@RequestParam("productId") String productId) {
        Optional<MarketItem> item = marketRepository.findById(productId);
        if (item.isPresent()) {
            marketRepository.delete(item.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @CrossOrigin
    @GetMapping("/read/by-category")
    public ResponseEntity<String> readProductsByCategory(@RequestParam("category") String category,
                                                         @RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Optional<ArrayList<MarketItem>> items = marketRepository.findItemByCategory(category);

        if (items.isPresent()) {
            ArrayList<MarketItem> filteredItems = new ArrayList<>(items.get());
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredItems.size());
            Page<MarketItem> pages = new PageImpl<>(filteredItems.subList(start, end), pageable, filteredItems.size());
            return new ResponseEntity(pages, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    @CrossOrigin
    @GetMapping("/not-expired")
    public ResponseEntity<List<MarketItem>> findNotExpiredItems() {
        long currentTime = Instant.now().getEpochSecond();
        List<MarketItem> allItems = marketRepository.findAll();
        List<MarketItem> notExpiredItemDTOs = new ArrayList<>();

        for (MarketItem item : allItems) {
            LocalDateTime expirationTime = item.getPublishDate().plusSeconds(item.getDurationInSeconds());
            if (expirationTime.isAfter(now())) {
                MarketItem itemDTO = new MarketItem(item.getProductId(), item.getProfile(), item.getTitle(), item.getDescription(), item.getCategory(), item.getPrice(), item.isPublished(), item.getImage(), item.getPublishDate(), item.getDurationInSeconds());
                notExpiredItemDTOs.add(itemDTO);
            }
        }
        if (notExpiredItemDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(notExpiredItemDTOs, HttpStatus.OK);
        }

        //return notExpiredItemDTOs;



/*
        for (MarketItem item: notExpiredItems) {
            MarketItem itemDTO = new MarketItem(item.getProductId(), item.getProfile(), item.getTitle(), item.getDescription(), item.getCategory(), item.getPrice(), item.isPublished(), item.getImage(), item.getPublishDate(), item.getDurationInSeconds());
            notExpiredItemDTOs.add(itemDTO);
        }
        return notExpiredItemDTOs;
    }*/
}

/*
    @GetMapping("/not-expired")
    public List<MarketItemDTO> findNotExpiredItems() {
        long currentTime = Instant.now().getEpochSecond();
        List<MarketItem> allItems = marketItemRepository.findAll();
        List<MarketItemDTO> notExpiredItemDTOs = new ArrayList<>();
        for (MarketItem item : allItems) {
            long expirationTime = item.getCreationTime() + item.getDurationInSeconds();
            if (expirationTime > currentTime) {
                MarketItemDTO itemDTO = new MarketItemDTO(item.getId(), item.getProfile(), item.getTitle(), item.getDescription(), item.getCategory(), item.getPrice(), item.getPublished(), item.getImage(), item.getCreationTime(), item.getDurationInSeconds());
                notExpiredItemDTOs.add(itemDTO);
            }
        }
        return notExpiredItemDTOs;
    }

*/

    /*
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> updateProductItem(@RequestParam("productId") String productId, @RequestParam("profile") Optional<String> profile, @RequestParam("title") Optional<String> title, @RequestParam("description") Optional<String> description, @RequestParam("category") Optional<ArrayList> category, @RequestParam("price") Optional<Double> price) {
        Optional<MarketItem> item = marketRepository.findById(productId);

        if (item.isPresent()) {
            MarketItem productItem = item.get();

            profile.ifPresent(productItem::setProfile);
            title.ifPresent(productItem::setTitle);
            description.ifPresent(productItem::setDescription);
            category.ifPresent(productItem::setCategory);
            price.ifPresent(productItem::setPrice);

            productItem = marketRepository.save(productItem);
            return new ResponseEntity(productItem, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProductItem(@RequestParam("productId") String productId) {
        Optional<MarketItem> item = marketRepository.findById(productId);
        if (item.isPresent()) {
            marketRepository.delete(item.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
    @CrossOrigin
    @GetMapping("/read/all")
    public ResponseEntity<String> readAllProducts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MarketItem> items = marketRepository.findAll(pageable);

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
        Optional<ArrayList<MarketItem>> items = marketRepository.findItemByCategory(category);

        if (items.isPresent()) {
            ArrayList<MarketItem> filteredItems = new ArrayList<>(items.get());
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredItems.size());
            Page<MarketItem> pages = new PageImpl<>(filteredItems.subList(start, end), pageable, filteredItems.size());
            return new ResponseEntity(pages, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


 */

    
}
