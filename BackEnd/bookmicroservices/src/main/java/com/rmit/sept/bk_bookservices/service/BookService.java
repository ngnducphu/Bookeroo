package com.rmit.sept.bk_bookservices.service;

import com.rmit.sept.bk_bookservices.exception.InvalidSearchTermException;
import com.rmit.sept.bk_bookservices.exception.ItemAlreadyExistsException;
import com.rmit.sept.bk_bookservices.exception.ItemNotFoundException;
import com.rmit.sept.bk_bookservices.model.Author;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.Category;
import com.rmit.sept.bk_bookservices.model.Publisher;
import com.rmit.sept.bk_bookservices.payload.AddEditBookRequest;
import com.rmit.sept.bk_bookservices.repository.BookRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.rmit.sept.bk_bookservices.validator.ISBNValidator.*;
import static java.text.MessageFormat.format;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PublisherService publisherService;

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public List<Book> getBooksByTitle(String title){
        List<Book> bookList = bookRepository.findByTitle(title);
        if(bookList.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the title: {0}, present in the database", title));
        }
        return bookList;
    }

    public List<Book> getBooksByAuthor(String author){
        List<Book> bookList = bookRepository.findByAuthor(author);
        if(bookList.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the author: {0}, present in the database", author));
        }
        return bookList;
    }
    
    public List<Book> getBooksByUserId(long userId){
        List<Book> bookList = bookRepository.findByUserId(userId);
        if(bookList.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the user ID: {0}, present in the database", userId));
        }
        return bookList;
    }

    public List<Book> getBooksByCategory(String category){
        List<Book> bookList = bookRepository.findByCategory(category);
        if(bookList.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the category: {0}, present in the database", category));
        }
        return bookList;
    }

    public List<Book> getBooksByISBN(String ISBN){
        List<Book> books;
        if(isISBN10(ISBN)){
            books = bookRepository.findByISBN10(ISBN);
        }
        else if(isISBN13(ISBN)){
            books = bookRepository.findByISBN13(ISBN);
        }
        else{
            throw new InvalidSearchTermException(format("The ISBN value: {0}, entered is not valid.", ISBN));
        }

        if(books.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the ISBN: {0}, present in the database", ISBN));
        }
        return books;
    }

    public Book getBookById(long id) {
        Optional<Book> book = bookRepository.findById(id);
        if(book.isEmpty()){
            throw new ItemNotFoundException(format("There are no books with the id: {0}, present in the database", id));
        }
        return book.get();
    }

    public Book addBook(Book book){
        try{
            return bookRepository.save(book);
        }
        catch (Exception e){
            throw new ItemAlreadyExistsException("Invalid book duplicate.");
        }
    }

    public Book editBook(Book oldBook, AddEditBookRequest bookRequest){
        Book newBook = bookRequest.getBook();
        processBookDetails(newBook, bookRequest);
        BeanUtils.copyProperties(newBook, oldBook, "id", "createdDate", "modifiedDate", "lastUpdatedBy");
        return bookRepository.save(oldBook);
    }

    public void processBookDetails(Book book, AddEditBookRequest bookRequest){
        Set<Author> authors = new HashSet<>();
        bookRequest.getAuthorNames().forEach((authorName) -> {
            if(authorService.checkAuthorExist(authorName)) {
                authors.add(authorService.getAuthorByName(authorName));
            }
            else{
                authors.add(authorService.addAuthor(authorName));
            }
        });

        Set<Category> categories = new HashSet<>();
        bookRequest.getCategoryNames().forEach((categoryName) -> {
            if(categoryService.checkCategoryExist(categoryName)){
                categories.add(categoryService.getCategoryByName(categoryName));
            }
            else{
                categories.add(categoryService.addCategory(categoryName));
            }
        });

        Publisher publisher;
        if(publisherService.checkPublisherExist(bookRequest.getPublisherName())){
            publisher = publisherService.getPublisherByName(bookRequest.getPublisherName());
        }
        else{
            publisher = publisherService.addPublisher(bookRequest.getPublisherName());
        }

        validateISBN(book.getISBN10());
        validateISBN(book.getISBN13());

        book.setAuthors(authors);
        book.setCategories(categories);
        book.setPublisher(publisher);
    }

    private void validateISBN(String ISBN){
        if(ISBN!=null && !ISBN.isBlank() && !isValidISBN(ISBN)){
            throw new InvalidSearchTermException(format("The ISBN value: {0}, entered is not valid.", ISBN));
        }
    }

    public void removeBook(Book book){
        bookRepository.delete(book);
    }
}
