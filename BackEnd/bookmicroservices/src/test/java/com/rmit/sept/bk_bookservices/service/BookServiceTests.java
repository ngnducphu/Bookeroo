package com.rmit.sept.bk_bookservices.service;

import com.rmit.sept.bk_bookservices.exception.ItemNotFoundException;
import com.rmit.sept.bk_bookservices.exception.InvalidSearchTermException;
import com.rmit.sept.bk_bookservices.model.Author;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.Category;
import com.rmit.sept.bk_bookservices.model.Publisher;
import com.rmit.sept.bk_bookservices.payload.AddEditBookRequest;
import com.rmit.sept.bk_bookservices.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@SpringBootTest
public class BookServiceTests {

    @InjectMocks
    private BookService bookService;

    @Mock
    private BookRepository bookRepository;
    
    @Mock
    private AuthorService authorService;
    
    @Mock
    private CategoryService categoryService;
    
    @Mock 
    private PublisherService publisherService;
    
   
    @Test
    void test_getBookByTitle_titleNotExist_fail(){
        doReturn(new ArrayList<Book>()).when(bookRepository).findByTitle(any());
        assertThrows(ItemNotFoundException.class, () -> {
            bookService.getBooksByTitle("invalidTitle");
        });
        verify(bookRepository, times(1)).findByTitle(any());
    }
    
    @Test
    void test_getBookByUserId_userIdNotExist_fail(){        
        assertThrows(ItemNotFoundException.class, () -> {
            bookService.getBooksByUserId(10);
        });        
    }

    @Test
    void test_getBookByAuthor_authorNotExist_fail(){
        doReturn(new ArrayList<Book>()).when(bookRepository).findByAuthor(any());
        assertThrows(ItemNotFoundException.class, () -> {
            bookService.getBooksByAuthor("invalidAuthor");
        });
        verify(bookRepository, times(1)).findByAuthor(any());
    }

    @Test
    void test_getBookByCategory_categoryNotExist_fail(){
        doReturn(new ArrayList<Book>()).when(bookRepository).findByCategory(any());
        assertThrows(ItemNotFoundException.class, () -> {
            bookService.getBooksByCategory("invalidCategory");
        });
        verify(bookRepository, times(1)).findByCategory(any());
    }

    @Test
    void test_getBookById_idNotExist_fail(){
        doReturn(Optional.ofNullable(null)).when(bookRepository).findById(any());
        assertThrows(ItemNotFoundException.class, () -> {
            bookService.getBookById(123);
        });
        verify(bookRepository, times(1)).findById(any());
    }

    @Test
    void test_addBook_successful() {
    	Author reki = Author.builder().name("Reki Kawahara").build();

        Category sf = Category.builder().name("Science Fiction").build();

        Publisher yen = Publisher.builder().name("Yen Press").build();

        Book book = Book.builder()
                        .userId((long)2)
                        .title("Testing book Sword Art Online Progressive, Vol. 1")
                        .publishedDate(LocalDate.of(2013, 10, 10))
                        .shortDescription("The volume contains Kirito and Asuna's adventures on the 1st and 2nd floors of Aincrad, including two officially published side stories from Reki's web novel.")
                        .longDescription("There's no way to beat this game. The only difference is when and where you die... One month has passed since Akihiko Kayaba's deadly game began, and the body count continues to rise. Two thousand players are already dead. Kirito and Asuna are two very different people, but they both desire to fight alone. Nonetheless, they find themselves drawn together to face challenges from both within and without. Given that the entire virtual world they now live in has been created as a deathtrap, the surviving players of Sword Art Online are starting to get desperate, and desperation makes them dangerous to loners like Kirito and Asuna. As it becomes clear that solitude equals suicide, will the two be able to overcome their differences to find the strength to believe in each other, and in so doing survive?")
                        .ISBN10("0316259365")
                        .coverImageUrl("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3162/9780316259361.jpg")
                        .price(100)
                        .quantity(10)
                        .status("New")
                        .authors(Set.of(reki))
                        .categories(Set.of(sf))
                        .publisher(yen)
                        .build();
        doReturn(book).when(bookRepository).save(any());
        assertEquals(book, bookService.addBook(book), "add book sucessfully");
    }
    
    @Test
    void test_editBook_successful() {
    	Author reki = Author.builder().name("Reki Kawahara").build();

        Category sf = Category.builder().name("Science Fiction").build();

        Publisher yen = Publisher.builder().name("Yen Press").build();

        Book oldBook = Book.builder()
                        .userId((long)2)
                        .title("Testing book Sword Art Online Progressive, Vol. 1")
                        .publishedDate(LocalDate.of(2013, 10, 10))
                        .shortDescription("The volume contains Kirito and Asuna's adventures on the 1st and 2nd floors of Aincrad, including two officially published side stories from Reki's web novel.")
                        .longDescription("There's no way to beat this game. The only difference is when and where you die... One month has passed since Akihiko Kayaba's deadly game began, and the body count continues to rise. Two thousand players are already dead. Kirito and Asuna are two very different people, but they both desire to fight alone. Nonetheless, they find themselves drawn together to face challenges from both within and without. Given that the entire virtual world they now live in has been created as a deathtrap, the surviving players of Sword Art Online are starting to get desperate, and desperation makes them dangerous to loners like Kirito and Asuna. As it becomes clear that solitude equals suicide, will the two be able to overcome their differences to find the strength to believe in each other, and in so doing survive?")
                        .ISBN10("0316259365")
                        .coverImageUrl("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3162/9780316259361.jpg")
                        .price(100)
                        .quantity(10)
                        .status("New")
                        .authors(Set.of(reki))
                        .categories(Set.of(sf))
                        .publisher(yen)
                        .build();
        Book newBook = Book.builder()
                .userId((long)2)
                .title("Edited book Sword Art Online Progressive, Vol. 1")
                .publishedDate(LocalDate.of(2013, 10, 10))
                .shortDescription("The volume contains Kirito and Asuna's adventures on the 1st and 2nd floors of Aincrad, including two officially published side stories from Reki's web novel.")
                .longDescription("There's no way to beat this game. The only difference is when and where you die... One month has passed since Akihiko Kayaba's deadly game began, and the body count continues to rise. Two thousand players are already dead. Kirito and Asuna are two very different people, but they both desire to fight alone. Nonetheless, they find themselves drawn together to face challenges from both within and without. Given that the entire virtual world they now live in has been created as a deathtrap, the surviving players of Sword Art Online are starting to get desperate, and desperation makes them dangerous to loners like Kirito and Asuna. As it becomes clear that solitude equals suicide, will the two be able to overcome their differences to find the strength to believe in each other, and in so doing survive?")
                .ISBN10("0316259365")
                .coverImageUrl("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3162/9780316259361.jpg")
                .price(100)
                .quantity(10)
                .status("New")
                .build();
        
        AddEditBookRequest bookRequest = AddEditBookRequest.builder()
        									.book(newBook)
        									.authorNames(Set.of("Reki Kawahara"))
        									.categoryNames(Set.of("Science Fiction"))
        									.publisherName("Yen Press")
        									.build();
        
        doReturn(newBook).when(bookRepository).save(any());
        
        doReturn(true).when(authorService).checkAuthorExist(any());
        doReturn(reki).when(authorService).getAuthorByName(any());
        
        doReturn(true).when(categoryService).checkCategoryExist(any());
        doReturn(sf).when(categoryService).getCategoryByName(any());
        
        doReturn(true).when(publisherService).checkPublisherExist(any());
        doReturn(yen).when(publisherService).getPublisherByName(any());
        
        assertEquals(newBook, bookService.editBook(oldBook, bookRequest), "edit book sucessfully");
    }
    
    @Test
    void test_removeBook_successful(){
    	Book book = Book.builder()
                .userId((long)2)
                .title("Edited book Sword Art Online Progressive, Vol. 1")
                .publishedDate(LocalDate.of(2013, 10, 10))
                .shortDescription("The volume contains Kirito and Asuna's adventures on the 1st and 2nd floors of Aincrad, including two officially published side stories from Reki's web novel.")
                .longDescription("There's no way to beat this game. The only difference is when and where you die... One month has passed since Akihiko Kayaba's deadly game began, and the body count continues to rise. Two thousand players are already dead. Kirito and Asuna are two very different people, but they both desire to fight alone. Nonetheless, they find themselves drawn together to face challenges from both within and without. Given that the entire virtual world they now live in has been created as a deathtrap, the surviving players of Sword Art Online are starting to get desperate, and desperation makes them dangerous to loners like Kirito and Asuna. As it becomes clear that solitude equals suicide, will the two be able to overcome their differences to find the strength to believe in each other, and in so doing survive?")
                .ISBN10("0316259365")
                .coverImageUrl("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3162/9780316259361.jpg")
                .price(100)
                .quantity(10)
                .status("New")
                .build();
        doNothing().when(bookRepository).delete(any());
        bookService.removeBook(book);
        verify(bookRepository, times(1)).delete(book);
    }
    
    private static Stream<String> invalidISBNs(){
        return Stream.of("123",
                "ABC",
                "Invalid",
                "",
                "abcdefghij",
                "abcdefghijklm",
                null);
    }

    @ParameterizedTest
    @MethodSource("invalidISBNs")
    void test_getBookByISBN_invalidISBN_fail(String ISBN){
        assertThrows(InvalidSearchTermException.class, () -> {
            bookService.getBooksByISBN(ISBN);
        });
    }

    private static Stream<String> validISBNs(){
        return Stream.of("1234567890",
                "1234567890123");
    }

    @ParameterizedTest
    @MethodSource("validISBNs")
    void test_getBookByISBN_validISBN_pass(String ISBN){
        List<Book> testBooks = List.of(Book.builder().title("Test Book").userId((long)1).build(),
                Book.builder().title("Test Book 2").userId((long)2).build());
        doReturn(testBooks).when(bookRepository).findByISBN10(any());
        doReturn(testBooks).when(bookRepository).findByISBN13(any());
        List<Book> resultBooks = bookService.getBooksByISBN(ISBN);
        assertEquals(testBooks, resultBooks);
    }

}
