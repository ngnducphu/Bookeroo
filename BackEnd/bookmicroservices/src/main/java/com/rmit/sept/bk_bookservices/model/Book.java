package com.rmit.sept.bk_bookservices.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotNull(message = "UserId is required")
    @Column(nullable = false)
    private Long userId;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    private String ISBN10;

    private String ISBN13;

    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    @ManyToMany
    private Set<Author> authors = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "book_category",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    private LocalDate publishedDate;

    @Column(columnDefinition="LONGTEXT")
    private String shortDescription;

    @Column(columnDefinition="LONGTEXT")
    private String longDescription;

    @NotBlank(message = "Book status is required")
    @Column(nullable = false)
    private String status;

    private double price;

    private int quantity;

    private String coverImageUrl;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime modifiedDate;

    private String lastUpdatedBy;

    @PrePersist
    private void preInsert(){
        createdDate = LocalDateTime.now();
        modifiedDate = LocalDateTime.now();
    }

    @PreUpdate
    private void preUpdate(){
        modifiedDate = LocalDateTime.now();
    }
}
