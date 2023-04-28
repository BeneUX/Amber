package amber.team.market.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Document("markets")
public class MarketItem {

    @Id
    private String productId;
    private String profile;
    private String title;
    private String description;
    private ArrayList category;
    private double price;
    private boolean published;
    private byte[] image;
    private LocalDateTime publishDate;
    private int durationInSeconds;
    private String boughtBy;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
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

    public ArrayList<String> getCategory() {
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

     public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public LocalDateTime getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDateTime publishDate) {
        this.publishDate = publishDate;
    }

    public int getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(int durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }

    public String getBoughtBy() {
        return boughtBy;
    }

    public void setBoughtBy(String boughtBy) {
        this.boughtBy = boughtBy;
    }

    public MarketItem(String productId, String profile, String title, String description, ArrayList<String> category, double price, boolean published, byte[] image, LocalDateTime publishDate, int durationInSeconds) {
        super();
        this.productId = productId;
        this.profile = profile;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.published = published;
        this.image = image;
        this.publishDate = publishDate;
        this.durationInSeconds = 1209600; //2wochen
        this.boughtBy = boughtBy;
    }
}
