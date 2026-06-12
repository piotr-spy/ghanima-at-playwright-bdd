@HomePageTests @Regression
Feature: Home Page

# As a user, I must have access to home page,
# so that I can navigate to other pages and use the application
@HomePageLayoutTest @Smoke
Scenario: Home page - basic layout check
    When User navigates to Home page
    Then Home page contains all the necessary sections