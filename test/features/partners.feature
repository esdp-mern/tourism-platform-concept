@partnersPage

Feature: Partner tests for Admin

  Scenario: Admin creates a partner
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    When I click "Login" button
    Then I go to the home page
    When I click "Admin Page" link
    Then I go to the partner accepting page
    When I click the first "Accept" button
    Then I go to the home page