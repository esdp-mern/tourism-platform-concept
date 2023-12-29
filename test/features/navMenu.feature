@navMenu

Feature: Navigation menu for every role

  Scenario: Not authorized user navigation menu
    Given I am on home page
    When I click "Tours" link
    Then I go to the tours page
    When I click "About Us" link
    Then I go to the about us page
    When I click "News" link
    Then I go to the news page
    When I click "Contact Us" link
    Then I go to the contact us page

  Scenario: Logged-in user nav menu
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the home page
    When I click "Tours" link
    Then I go to the tours page
    When I click "About Us" link
    Then I go to the about us page
    When I click "My profile" link
    Then I go to the profile page
    When I click "News" link
    Then I go to the news page
    When I click "Contact Us" link
    Then I go to the contact us page


  Scenario: Moderator nav menu
    Given I am on sign in page
    When I enter form fields:
      | username | moderator  |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the home page
    When I click "Tours" link
    Then I go to the tours page
    When I click "About Us" link
    Then I go to the about us page
    When I click "My profile" link
    Then I go to the profile page
    When I click "Orders" link
    Then I go to the orders page
    When I click "News" link
    Then I go to the news page
    When I click "Contact Us" link
    Then I go to the contact us page

  Scenario: Admin nav menu
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the home page
    When I click "Tours" link
    Then I go to the tours page
    When I click "About Us" link
    Then I go to the about us page
    When I click "My profile" link
    Then I go to the profile page
    When I click "Admin Page" link
    Then I go to the admin page
    When I click "News" link
    Then I go to the news page
    When I click "Contact Us" link
    Then I go to the contact us page