package amber.team.produkt.repository;

import amber.team.produkt.model.ProductItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<ProductItem, String> {
    @Query("{profile:'?0'}")
    Optional<ArrayList<ProductItem>> findItemByprofileId(String profileId);

    @Query("{category:'?0'}")
    Optional<ArrayList<ProductItem>> findItemByCategory(String category);

    @Query("{published: ?0, sold: false}") // Update the query to include "sold: false"
    Page<ProductItem> findByPublished(boolean published, Pageable pageable);
    
}
