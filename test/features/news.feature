@newsPage

Feature: News Creation by Admin

  Scenario: Admin creates a news
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    When I click "Login" button
    Then I go to the news creation page
    When I enter news form fields:
      | title | News One |
      | description | text |
    When I attach the news file "images/image.jpeg" to the "input#images" input
    Then I click "Add Category" button
    When I enter category form fields:
      | in0 | category |
    Then I click "Create News" button
    Then I go to the home page

  Scenario: Admin edit one of news
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin news page
    And I click the "non published" button
    When I click the first "Edit" link
    When I navigate to the news edit page
    When I attach the news file "images/image.jpeg" to the "input#images" input
    Then I click "Save News" button
    Then I go to the home page

  Scenario: Admin delete one of news
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin news page
    And I click the "non published" button
    When I click the first "Delete" button
    Then I see the confirmation alert "Are you sure you want to delete this news?"
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay on the news admin page