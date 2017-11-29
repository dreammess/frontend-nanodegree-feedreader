/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have urls', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toBe(0);
                // If string is empty, it will return false and
                // fail the test
                expect(feed.url).not.toBe(false);
            });
        });


        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).not.toBe(0);
                expect(feed.name).not.toBe(false);
            });
        });
    });


    describe('The menu', function() {

        // Ensure that the menu is not visible upon
        // loading the page.
        it('is hidden by default', function() {
            var body = document.getElementsByTagName('body')[0];
            expect(body).toBeDefined();
            expect(body.className).toContain('menu-hidden');
        });

        // The Menu can be hidden and reappear upon clicking.
        it('toggles visibility upon being clicked', function() {
            var menuIcon = document.getElementsByClassName('menu-icon-link')[0];
            var body = document.getElementsByTagName('body')[0];

            expect(body).toBeDefined();
            expect(menuIcon).toBeDefined();
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.className).toContain('menu-hidden');
        });
    });


    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

         it('should contain at least one entry', function(done) {
            // Check for a .entry element within the .feed container.
            var entry = document.getElementsByClassName('feed')[0].getElementsByClassName('entry')[0];

            expect(entry).toBeDefined();
            expect(entry.className).toContain('entry');
            done();
         });
    });

    describe('New Feed Selection', function() {
        var originalContent;

        beforeEach(function(done) {
            // Load feed index 0.
            loadFeed(0, function() {
                originalContent = document.getElementsByClassName('feed')[0].innerHTML;
                done();
            });
        });

        it('should change when a new feed is loaded', function(done) {
            var newContent;
            // Load feed index 1 to compare to index 0.
            loadFeed(1, function() {
                newContent = document.getElementsByClassName('feed')[0].innerHTML;

                // Check that both Contents are defined.
                expect(originalContent).toBeDefined();
                expect(newContent).toBeDefined();

                // Compare feed index 0 and feed index 1.
                expect(originalContent == newContent).toBe(false);
                done();
            });
        });
    });
}());
