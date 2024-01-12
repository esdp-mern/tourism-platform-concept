@partnersApplication

Feature: Application to become a partner
  Scenario: Accept an application from a partner
    Given I am on sign in page
    When I enter form fields:
      | username | admin       |
      | password | qwerty1234 |
    When I click "Login" button
    Then I wait 2 sec
    Then I am on home page
    Then I wait 4 sec
    When I click "Admin Page" link
    Then I wait 4 sec
    Then I go to the admin page
    Then I wait 4 sec
    When I click "Partner orders" admin link
    Then I wait 5 sec
    When I'm looking for the right application and accept application
    Then I wait 5 sec
    Then I am on home page
    Then I wait 2 sec
    When I click "About Us" link
    Then I wait 4 sec
    Then I go to the about us page
    Then I wait 4 sec
    Then I see "Ak-Maral" element
