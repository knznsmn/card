# WI-FI Cards Beautifier
A very simple web app that extracts numbers from strings and generates a printable A4-size page of cards.

## The Story:
I work in a hotel as a concierge. In our hotel, we give free Internet access to our guests in the form of Wi-Fi cards attached to their room card holders. This Wi-Fi access code is printed on a small 5cm x 3.5cm piece of paper. The problem that this small app solves is generating these cards. The current process for generating these cards is somewhat tedious, as I'll recount here.

I observed that to generate these cards containing the access codes for our guests, my colleagues at reception have to go through several steps. First, they generate the access codes from a software (it runs in a browser) that manages our hotel's Wi-Fi service. The software generates a table of hundreds of passwords in several columns and rows. They then print this long table of passwords and type the codes into Wi-Fi cards formatted in an Excel document, one by one. Manually. It's tedious, to say the least. The result is adequate, but I think it can be automated. I'm pretty sure there are some pieces of software out there that can do this in one go, but ours can't. So, I wrote this small program that runs in a browser too. The goal is to make the whole process a little easier for my colleagues and a little more presentable. We're a hospitality business, after all.

## How It Works:
This program accepts a string as input. The user can select all the content of the Wi-Fi software's page, hit `ctrl-C`, and paste everything from the clipboard into the textbox. The logic of the program is simple. Since the Wi-Fi codes generated are always 5 or 6-digit numbers, I can extract them with regex. The user then chooses the type of Wi-Fi they generated: 1 day use, 1 week, or 1 month. The `extract()` function is called, which uses the `.match()` method to search for 5 or 6-digit regular expressions contained in the pasted strings of input, save the matches in an array, and finally return the aforementioned array. A "Generate" button is then displayed. When pressed, the program calls the `cardGen()` function that inserts each element of the array returned by `extract()` into a structured card div, which in turn is inserted into an A4 sized div that serves as a page.

The result is neater, more presentable Wi-Fi cards filling an A4-size document. One page should contain 32 pieces of 5cm by 3.5cm cards. To improve the paper's efficiency by maximizing usefulness and reducing waste, the algorithm discards `total matches % 32`. This way, the program only prints a whole A4 page filled with 32 cards. The result is no page is printed that has unused spaces in it (except for margins, of course), and hopefully, a slightly more eco-friendly project :earth_asia:.

But yes, we shouldn't be cutting trees to be used for printed access codes, among other things, in the first place. 😅 😓

## To-Do's
- [ ] Clean up the artifacts left by refactoring the code
- [x] Add error handling
- [x] Better responsiveness
- [ ] Better UI please Jesus I'm so lazy