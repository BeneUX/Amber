package amber.team.profile.api;

import amber.team.profile.model.ProfileItem;
import amber.team.profile.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/profiles")
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    private final ProfileRepository profilesRepository;

    public ProfileController(ProfileRepository profilesRepository) {
        this.profilesRepository = profilesRepository;
    }

    @CrossOrigin
    @GetMapping("/read")
    public ResponseEntity<ProfileItem> readProfileItem(@RequestParam("id") Optional<String> id, @RequestParam("phonenumber") Optional<String> phonenumber) {
        logger.debug("GET /read for: %s %s", id, phonenumber);
        if (phonenumber.isEmpty() && id.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        if (phonenumber.isPresent()) {
            Optional<ProfileItem> item = profilesRepository.findItemByPhonenumber(phonenumber.get());
            if (item.isPresent()) {
                return new ResponseEntity(item, HttpStatus.FOUND);
            }
        }

        if (id.isPresent()) {
            Optional<ProfileItem> item = profilesRepository.findById(id.get());
            if (item.isPresent()) {
                return new ResponseEntity(item, HttpStatus.FOUND);
            }
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam("id") Optional<String> id, @RequestParam("phonenumber") Optional<String> phonenumber, @RequestParam("password") String password) {
        if (phonenumber.isEmpty() && id.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Optional<ProfileItem> item = null;
        if (phonenumber.isPresent()) {
            item = profilesRepository.findItemByPhonenumber(phonenumber.get());
        } else if (id.isPresent()) {
            item = profilesRepository.findById(id.get());
        }

        if (item.isPresent()) {
            if (item.get().getPassword().equals(password)) {
                return new ResponseEntity(HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> insertProfileItem(@RequestParam("firstname") String firstname, @RequestParam("lastname") String lastname, @RequestParam("password") String password, @RequestParam("birthdate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate birthdate, @RequestParam("phonenumber") String phonenumber) {

        ProfileItem item = new ProfileItem(firstname, lastname, password, birthdate, phonenumber);
        ProfileItem result = profilesRepository.insert(item);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> updateProfileItem(@RequestParam("id") Optional<String> id, @RequestParam("phonenumber") Optional<String> phonenumber,

                                                    @RequestParam("firstname") Optional<String> firstname, @RequestParam("lastname") Optional<String> lastname, @RequestParam("password") Optional<String> password, @RequestParam("birthdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Optional<LocalDate> birthdate) {

        if (phonenumber.isEmpty() && id.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        if (phonenumber.isPresent()) {
            Optional<ProfileItem> item = profilesRepository.findItemByPhonenumber(phonenumber.get());
            if (updateProfile(phonenumber, firstname, lastname, password, birthdate, item))
                return new ResponseEntity(item, HttpStatus.OK);
        }

        if (id.isPresent()) {
            Optional<ProfileItem> item = profilesRepository.findById(id.get());
            if (updateProfile(phonenumber, firstname, lastname, password, birthdate, item))
                return new ResponseEntity(item, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @DeleteMapping("delete")
    public ResponseEntity<String> deleteProfileItem(@RequestParam("id") Optional<String> id, @RequestParam("phonenumber") Optional<String> phonenumber) {
        if (phonenumber.isEmpty() && id.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Optional<ProfileItem> item = null;
        if (phonenumber.isPresent()) {
            item = profilesRepository.findItemByPhonenumber(phonenumber.get());
        }

        if (id.isPresent()) {
            item = profilesRepository.findById(id.get());
        }

        if (item.isPresent()) {
            profilesRepository.delete(item.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    private boolean updateProfile(@RequestParam("phonenumber") Optional<String> phonenumber, @RequestParam("firstname") Optional<String> firstname, @RequestParam("lastname") Optional<String> lastname, @RequestParam("password") Optional<String> password, @DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam("birthdate") Optional<LocalDate> birthdate, Optional<ProfileItem> item) {
        if (item.isPresent()) {
            ProfileItem profileItem = item.get();
            firstname.ifPresent(profileItem::setFirstname);
            lastname.ifPresent(profileItem::setLastname);
            password.ifPresent(profileItem::setPassword);
            birthdate.ifPresent(profileItem::setBirthdate);
            phonenumber.ifPresent(profileItem::setPhonenumber);

            profilesRepository.save(profileItem);

            return true;
        }
        return false;
    }
}
