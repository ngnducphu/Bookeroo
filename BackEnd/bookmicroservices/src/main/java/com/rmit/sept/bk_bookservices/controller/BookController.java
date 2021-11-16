 package com.rmit.sept.bk_bookservices.controller;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.payload.AddEditBookRequest;
import com.rmit.sept.bk_bookservices.service.BookService;
import com.rmit.sept.bk_loginservices.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;

import static java.text.MessageFormat.format;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllBooks(){
        return ResponseEntity.ok().body(bookService.getAllBooks());
    }

    @GetMapping(value = "/title={title}")
    public ResponseEntity<?> getBookByTitle(@PathVariable String title){
        return ResponseEntity.ok().body(bookService.getBooksByTitle(title));
    }

    @GetMapping(value = "/author={author}")
    public ResponseEntity<?> getBookByAuthor(@PathVariable String author){
        return ResponseEntity.ok().body(bookService.getBooksByAuthor(author));
    }

    @GetMapping(value = "/category={category}")
    public ResponseEntity<?> getBookByCategory(@PathVariable String category){
        return ResponseEntity.ok().body(bookService.getBooksByCategory(category));
    }

    @GetMapping(value = {"/ISBN={ISBN}", "/isbn={ISBN}", "/Isbn={ISBN}"})
    public ResponseEntity<?> getBookByISBN(@PathVariable String ISBN){
        return ResponseEntity.ok().body(bookService.getBooksByISBN(ISBN));
    }

    @GetMapping(value = {"/ID={id}", "/id={id}", "/Id={id}"})
    public ResponseEntity<?> getBookById(@PathVariable long id){
        return ResponseEntity.ok().body(bookService.getBookById(id));
    }
    
    @GetMapping(value = "/UserId={userId}")
    public ResponseEntity<?> getBookByUserId(@PathVariable long userId){
        return ResponseEntity.ok().body(bookService.getBooksByUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody AddEditBookRequest bookRequest, Principal principal){
        Book newBook = bookRequest.getBook();

        if(!userService.isUserAuthorised(principal, bookRequest.getBook().getUserId())){
            return new ResponseEntity<>("User not authorised to add book to this account.", HttpStatus.FORBIDDEN);
        }

        bookService.processBookDetails(newBook, bookRequest);
        newBook = bookService.addBook(newBook);
        return ResponseEntity.created(URI.create("api/books/ID=" + newBook.getId())).body(newBook);
    }

    @PutMapping("/edit/{bookId}")
    public ResponseEntity<?> editBook(@PathVariable long bookId, @RequestBody AddEditBookRequest bookRequest,
                                      Principal principal){

        Book book = bookService.getBookById(bookId);

        if(!userService.isUserAuthorised(principal, book.getUserId())){
            return new ResponseEntity<>("User not authorised to access this endpoint.", HttpStatus.FORBIDDEN);
        }

        book = bookService.editBook(book, bookRequest);
        return ResponseEntity.ok().body(book);
    }

    @DeleteMapping("/remove/{bookId}")
    public ResponseEntity<?> removeBook(@PathVariable long bookId, Principal principal){
        Book book = bookService.getBookById(bookId);

        if(!userService.isUserAuthorised(principal, book.getUserId())){
            return new ResponseEntity<>("User not authorised to access this endpoint.", HttpStatus.FORBIDDEN);
        }

        bookService.removeBook(book);
        return ResponseEntity.ok().body(format("Book with the ID: {0}, Title: {1}, has been successfully removed.",
                bookId, book.getTitle()));
    }
}
