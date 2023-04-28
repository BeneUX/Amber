package amber.team.profile.repository;

import amber.team.profile.model.ProfileItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ProfileRepository extends MongoRepository<ProfileItem, String> {

    @Query("{phonenumber:'?0'}")
    Optional<ProfileItem> findItemByPhonenumber(String phonenumber);
}
