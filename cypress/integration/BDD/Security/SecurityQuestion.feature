Feature: Security


    # #####  Security Question START #####

    # # Author: Sudheer Baraker
    # # Last Updated: 04/05/2022
    # # Comments :
    # # Scenario_ID : TC_112
    # #
    Scenario: To verify that master/network Admin can add security questions in the mobiquity System
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to security and click on security questions
        And User click on add questions and Enter question in the textbox
        And User click on Add
        Then User click on save

    # # # Author: Sudheer Baraker
    # # # Last Updated: 04/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_113
    # # #

    Scenario: To verify that master/network Admin is not able to add duplicate question
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to security and click on security questions
        And User click on add questions and question is already existing
        And User click on Add Button
        Then User click on save Button


    # # # Author: Sudheer Baraker
    # # # Last Updated: 04/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_114
    # # #

    Scenario: To verify that security question which are added by the user will be added in default system language
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to security and click on security questions
        And User click on add questions button and Enter question in the textbox
        And User click on Button Add
        Then User click on Button save


    # # # Author: Sudheer Baraker
    # # # Last Updated: 04/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_115
    # # #

    Scenario: To verify that if other language is selected while adding the security question then it is mandatory to add question in other language also
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to security and click on security questions
        And User click on add questions Button
        And User click on other language and enter the questions other language in question textbox
        And Click on add Button
        Then Click on Confirm Button

    #####            Security Question END                   #####

   