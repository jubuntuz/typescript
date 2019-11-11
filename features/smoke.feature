@smoke
Feature: ORRS smoke test

  Scenario:login
    Given I launch ORRS as a user:
      | username      | password |
      | junhong.zhang |          |


  @registration
  Scenario Outline: As a user, I should be able to register a patient
    When I register a Pregnancy patient at <location>
      |  |
      |  |
    Then I should see patientId in the page
    Examples:
      | location |
      | "DMA"    |
      | "SPHD"   |


  @treatment
  Scenario Outline: As a user, I should not add any treatment having invalid modality for its location
    Given I have a patient in manage Census page at <location>
    When I add "M" treatment
    Then I should not see any of <invalidModalities> in Modality dropdown list
      And I should see an error "Invalid Modality" while input any of <invalidModalities> in Modality code
    Examples:
      | location | invalidModalities                 |
      | "DMA"    | "281,291"                         |
      | "SPHD"   | "040,442,443,444,050,452,453,454" |


