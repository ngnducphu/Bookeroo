package com.rmit.sept.bk_bookservices.configuration;

import com.rmit.sept.bk_bookservices.model.Author;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.Category;
import com.rmit.sept.bk_bookservices.model.Publisher;
import com.rmit.sept.bk_bookservices.repository.AuthorRepository;
import com.rmit.sept.bk_bookservices.repository.BookRepository;
import com.rmit.sept.bk_bookservices.repository.CategoryRepository;
import com.rmit.sept.bk_bookservices.repository.PublisherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

//@Configuration
public class BookConfiguration {
    @Bean
    CommandLineRunner seedBooks(AuthorRepository authorRepository, BookRepository bookRepository,
                                 CategoryRepository categoryRepository, PublisherRepository publisherRepository) {
        return args -> {
            Author reki = Author.builder().name("Reki Kawahara").build();
            Author scott = Author.builder().name("F. Scott Fitzgerald").build();
            Author george = Author.builder().name("George R. R. Martin").build();
            Author lucy = Author.builder().name("Lucy Foley").build();
            Author alex = Author.builder().name("F. Alex Michaelides").build();
            Author paula = Author.builder().name("Paula Hawkins").build();
            Author lev = Author.builder().name("Lev Grossman").build();
            Author tolkien = Author.builder().name("J. R. R. Tolkien").build();
            Author harper = Author.builder().name("Harper Lee").build();

            Category sf = Category.builder().name("Science Fiction").build();
            Category novel = Category.builder().name("Novel").build();
            Category thriller = Category.builder().name("Thriller").build();
            Category fantasy = Category.builder().name("Fantasy").build();
            Category romance = Category.builder().name("Romance").build();

            Publisher yen = Publisher.builder().name("Yen Press").build();
            Publisher amazon = Publisher.builder().name("Amazon").build();

            authorRepository.saveAll(List.of(reki, scott, george, lucy, alex, paula, lev, tolkien, harper));
            categoryRepository.saveAll(List.of(sf, novel, fantasy, thriller, romance));
            publisherRepository.saveAll(List.of(yen, amazon));

            bookRepository.saveAll(List.of(
                    Book.builder()
                            .userId((long)2)
                            .title("Sword Art Online Progressive, Vol. 1")
                            .publishedDate(LocalDate.of(2013, 10, 10))
                            .shortDescription("The volume contains Kirito and Asuna's adventures on the 1st and 2nd floors of Aincrad, including two officially published side stories from Reki's web novel.")
                            .longDescription("There's no way to beat this game. The only difference is when and where you die... One month has passed since Akihiko Kayaba's deadly game began, and the body count continues to rise. Two thousand players are already dead. Kirito and Asuna are two very different people, but they both desire to fight alone. Nonetheless, they find themselves drawn together to face challenges from both within and without. Given that the entire virtual world they now live in has been created as a deathtrap, the surviving players of Sword Art Online are starting to get desperate, and desperation makes them dangerous to loners like Kirito and Asuna. As it becomes clear that solitude equals suicide, will the two be able to overcome their differences to find the strength to believe in each other, and in so doing survive?")
                            .ISBN10("0316259365")
                            .coverImageUrl("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3162/9780316259361.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(reki))
                            .categories(Set.of(fantasy, sf, novel))
                            .publisher(yen)
                            .build(),
                    Book.builder()
                            .userId((long)2)
                            .title("The Great Gatsby")
                            .publishedDate(LocalDate.of(1925, 4, 10))
                            .shortDescription("The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.")
                            .longDescription("The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.")
                            .ISBN10("9780743273565")
                            .coverImageUrl("https://images-na.ssl-images-amazon.com/images/I/81djg0KWthS.jpg")
                            .price(150)
                            .quantity(3)
                            .status("New")
                            .authors(Set.of(scott))
                            .categories(Set.of(novel, thriller, romance))
                            .publisher(amazon)
                            .build(),
                    Book.builder()
                            .userId((long)3)
                            .title("A Game of Thrones")
                            .publishedDate(LocalDate.of(1996, 8, 01))
                            .shortDescription("Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. Already hailed as a classic, George R. R. Martin’s stunning series is destined to stand as one of the great achievements of imaginative fiction.")
                            .longDescription("Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens. Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terro")
                            .ISBN10("0553103547")
                            .coverImageUrl("https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(george))
                            .categories(Set.of(fantasy, thriller, romance))
                            .build(),
                    Book.builder()
                            .userId((long)2)
                            .title("The Guest List")
                            .publishedDate(LocalDate.of(2021, 01, 06))
                            .shortDescription("On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one. The groom: handsome and charming, a rising television star. The bride: smart and ambitious, a magazine publisher. It's a wedding for a magazine, or for a celebrity: the designer dress, the remote location, the luxe party favors, the boutique whiskey. The cell phone service may be spotty and the waves may be rough, but every detail has been expertly planned and will be expertly executed. But perfection is for plans, and people are all too human. As the champagne is popped and the festivities begin, resentments and petty jealousies begin to mingle with the reminiscences and well wishes. The groomsmen begin the drinking game from their school days. The bridesmaid not-so-accidentally ruins her dress. The bride's oldest (male) friend gives an uncomfortably caring toast. And then someone turns up dead. Who didn't wish the happy couple well? And perhaps more important, why?")
                            .longDescription("A gripping, twisty murder mystery thriller from the No.1 bestselling author of The Hunting Party.\r\n"
                                    + "\r\n"
                                    + "On an island off the windswept Irish coast, guests gather for the wedding of the year – the marriage of Jules Keegan and Will Slater.\r\n"
                                    + "\r\n"
                                    + "Old friends.\r\n"
                                    + "Past grudges.\r\n"
                                    + "\r\n"
                                    + "Happy families.\r\n"
                                    + "Hidden jealousies.\r\n"
                                    + "\r\n"
                                    + "Thirteen guests.\r\n"
                                    + "One body.\r\n"
                                    + "\r\n"
                                    + "The wedding cake has barely been cut when one of the guests is found dead. And as a storm unleashes its fury on the island, everyone is trapped.\r\n"
                                    + "\r\n"
                                    + "All have a secret. All have a motive.\r\n"
                                    + "One guest won't leave this wedding alive . . .")
                            .ISBN10("9780008440183")
                            .coverImageUrl("https://www.booktopia.com.au/covers/500/9780008440183/8012/the-guest-list.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(lucy))
                            .categories(Set.of(thriller, novel))
                            .build(),
                    Book.builder()
                            .userId((long)2)
                            .title("The Silent Patient")
                            .publishedDate(LocalDate.of(2019, 02, 05))
                            .shortDescription("Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.")
                            .longDescription("Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.\r\n"
                                    + "\r\n"
                                    + "Alicia’s refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London.\r\n"
                                    + "\r\n"
                                    + "Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations—a search for the truth that threatens to consume him....\r\n"
                                    + "\r\n"
                                    + "The Silent Patient is a shocking psychological thriller of a woman’s act of violence against her husband—and of the therapist obsessed with uncovering her motive.")
                            .ISBN10("9781250301697")
                            .coverImageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582759969i/40097951.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(alex))
                            .categories(Set.of(thriller))
                            .build(),
                    Book.builder()
                            .userId((long)3)
                            .title("The Girl on the Train")
                            .publishedDate(LocalDate.of(2015, 1, 6))
                            .shortDescription("The Girl on the Train is a 2015 psychological thriller novel by British author Paula Hawkins that gives narratives from three different women about relationship troubles and binge drinking.")
                            .longDescription("Rachel catches the same commuter train every morning. She knows it will wait at the same signal each time, overlooking a row of back gardens. She’s even started to feel like she knows the people who live in one of the houses. “Jess and Jason,” she calls them. Their life—as she sees it—is perfect. If only Rachel could be that happy. And then she sees something shocking. It’s only a minute until the train moves on, but it’s enough. Now everything’s changed. Now Rachel has a chance to become a part of the lives she’s only watched from afar. Now they’ll see; she’s much more than just the girl on the train...")
                            .ISBN10("1594634122")
                            .coverImageUrl("https://cdn2.penguin.com.au/covers/original/9781784161750.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(paula))
                            .categories(Set.of(thriller, novel))
                            .build(),
                    Book.builder()
                            .userId((long)2)
                            .title("The Magicians")
                            .publishedDate(LocalDate.of(2009, 1, 1))
                            .shortDescription("The Magicians is a new adult fantasy novel by the American author Lev Grossman, published in 2009 by Viking Press. It tells the story of Quentin Coldwater, a young man who discovers and attends a secret college of magic in New York.")
                            .longDescription("A thrilling and original coming-of-age novel for adults about a young man practicing magic in the real world.\r\n"
                                    + "\r\n"
                                    + "Quentin Coldwater is brilliant but miserable. A senior in high school, he’s still secretly preoccupied with a series of fantasy novels he read as a child, set in a magical land called Fillory. Imagine his surprise when he finds himself unexpectedly admitted to a very secret, very exclusive college of magic in upstate New York, where he receives a thorough and rigorous education in the craft of modern sorcery.\r\n"
                                    + "\r\n"
                                    + "He also discovers all the other things people learn in college: friendship, love, sex, booze, and boredom. Something is missing, though. Magic doesn’t bring Quentin the happiness and adventure he dreamed it would. After graduation he and his friends make a stunning discovery: Fillory is real. But the land of Quentin’s fantasies turns out to be much darker and more dangerous than he could have imagined. His childhood dream becomes a nightmare with a shocking truth at its heart.\r\n"
                                    + "\r\n"
                                    + "At once psychologically piercing and magnificently absorbing, The Magicians boldly moves into uncharted literary territory, imagining magic as practiced by real people, with their capricious desires and volatile emotions. Lev Grossman creates an utterly original world in which good and evil aren’t black and white, love and sex aren’t simple or innocent, and power comes at a terrible price.")
                            .ISBN10("0452296293")
                            .coverImageUrl("https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1313772941l/6101718.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(lev))
                            .categories(Set.of(thriller, fantasy))
                            .build(),
                    Book.builder()
                            .userId((long)2)
                            .title("The Lord of the Rings")
                            .publishedDate(LocalDate.of(1954, 07, 24))
                            .shortDescription("The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, a place like Earth at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work.")
                            .longDescription("One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them\r\n"
                                    + "\r\n"
                                    + "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.\r\n"
                                    + "\r\n"
                                    + "From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion.\r\n"
                                    + "\r\n"
                                    + "When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom.\r\n"
                                    + "\r\n"
                                    + "The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.")
                            .ISBN10("9780007136582")
                            .coverImageUrl("https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg")
                            .price(100)
                            .quantity(10)
                            .status("New")
                            .authors(Set.of(tolkien))
                            .categories(Set.of(fantasy, novel))
                            .build(),
                    Book.builder()
                            .userId((long)4)
                            .title("To Kill a Mockingbird")
                            .publishedDate(LocalDate.of(1960, 7, 11))
                            .shortDescription("To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.")
                            .longDescription("The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. \"To Kill A Mockingbird\" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.\r\n"
                                    + "\r\n"
                                    + "Compassionate, dramatic, and deeply moving, \"To Kill A Mockingbird\" takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.")
                            .ISBN10("0446310786")
                            .coverImageUrl("https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg")
                            .price(100)
                            .quantity(10)
                            .status("Used")
                            .authors(Set.of(harper))
                            .categories(Set.of(novel, romance, fantasy))
                            .build()
            ));
        };
    }
}