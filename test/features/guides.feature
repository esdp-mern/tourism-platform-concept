@guidesApplication

Feature: Application to become a guide
  Scenario: Application to become a guide by user
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    When I click "Login" button
    Then I am on home page
    Then I click "Become a guide!" link
    Then I wait 8 sec
    When I enter form fields:
      | name | Rob      |
      | surname | Stark |
      | number | +996 777 777 777 |
      | message | I want to be your guide. |
    Then I click "Send" button

  Scenario: Accept an application from a guide
    Given I am on sign in page
    When I enter form fields:
      | username | admin       |
      | password | qwerty1234 |
    When I click "Login" button
    Then I am on home page
    When I click "Admin Page" link
    Then I go to the admin page
    When I click "Guide Orders" admin link
    Then I wait 5 sec
    Then I accept for the right guide application
    Then I wait 5 sec
    Then I enter languages
    When I enter form fields:
      | country | Kyrgyzstan       |
      | description | I nice guy! |
    When I attach the new file "images/guide1.webp" to the "input#image" input
    Then I click "Send" button
    Then I see "Guide is added" in alert.
