package amber.team.produkt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.Binary;

import java.util.ArrayList;

@Document("products")
public class ProductItem {

    @Id
    private String id;
    private String profile;
    private String title;
    private String description;
    private ArrayList category;
    private double price;
    private boolean published;
    private String image;
    private boolean sold;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList getCategory() {
        return category;
    }

    public void setCategory(ArrayList category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

     public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

     public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public ProductItem(String profile, String title, String description, ArrayList category, double price) {
        super();
        this.profile = profile;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.published = published;
        this.image = image;
        this.sold = sold;
    }
}
