@smoke
Feature: ORRS smoke test

  Scenario:login
    Given I launch ORRS as a user:
      |  |

 


  @treatment
  Scenario Outline: As a user, I should not add any treatment having invalid modality for its location
    Given I have a patient in manage Census page at <location>
    When I add "M" treatment
    Then I should not see any of <invalidModalities> in Modality dropdown list
      And I should see an error "Invalid Modality" while input any of <invalidModalities> in Modality code
    Examples:
      | location | invalidModalities                 |
      | "DMA"    | "281,291"                         |
      
