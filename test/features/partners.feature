@partnersPage

Feature: Partner tests for Admin

  Scenario: Admin creates/edit/delete a partner
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    When I click "Login" button
    Then I go to the home page
    When I click "Admin Page" link
    Then I go to the partner accepting page
    When I click the first "Accept" button
    Then I go to the admin partner page
    When I click the first "Edit" link
    When I navigate to the partner edit page
    When I enter new partner form fields:
      | name | Partner test |
    Then I click "Save" button
    Then I go to the admin partner page
    When I click the first "Delete" button
    Then I see the confirmation alert "Are you sure you want to delete this partner?"
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay on the partner admin page
