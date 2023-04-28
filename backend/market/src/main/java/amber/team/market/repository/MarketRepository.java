package amber.team.market.repository;

import amber.team.market.model.MarketItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;
import java.util.Optional;

public interface MarketRepository extends MongoRepository<MarketItem, String> {
    @Query("{profile:'?0'}")
    Optional<ArrayList<MarketItem>> findItemByproductId(String profileId);


    @Query("{category:'?0'}")
    Optional<ArrayList<MarketItem>> findItemByCategory(String category);


}

