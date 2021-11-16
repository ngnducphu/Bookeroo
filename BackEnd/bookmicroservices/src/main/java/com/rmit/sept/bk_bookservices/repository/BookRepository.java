package com.rmit.sept.bk_bookservices.repository;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAll();

    @Query(value = "SELECT * FROM book b " +
            "INNER JOIN book_author ba ON ba.book_id = b.id " +
            "INNER JOIN author a ON a.id = ba.author_id " +
            "WHERE a.name LIKE %?1%", nativeQuery = true)
    List<Book> findByAuthor(String author);

    @Query(value = "SELECT * FROM book b " +
            "INNER JOIN book_category bc ON bc.book_id = b.id " +
            "INNER JOIN category c ON c.id = bc.category_id " +
            "WHERE c.name LIKE %?1%", nativeQuery = true)
    List<Book> findByCategory(String category);

    List<Book> findByISBN10(String ISBN10);

    List<Book> findByISBN13(String ISBN13);

    @Query(value = "SELECT * FROM book WHERE title LIKE %?1%", nativeQuery = true)
    List<Book> findByTitle(String title);

	List<Book> findByUserId(long userId);

}
