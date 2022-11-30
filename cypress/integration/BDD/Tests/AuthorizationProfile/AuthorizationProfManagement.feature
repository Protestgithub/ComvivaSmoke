Feature: Modify Authorization profile

    #######################   Authorization Profile Management ##########################


       
    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_150
    # # #

    Scenario: To verify that system admin should be able to View Authorization profile for the selected category
        Given Login into Mobiquity Portal as System admin Maker
        When  Select Authorization profile
        Then View Profiles


    # # # Author: Sudheer Baraker
    # # # Last Updated: 18/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_151
    # # #


    Scenario: To verify that system admin should be able to modify an already created authorization profile
        Given Login into Mobiquity Portal as System admin Maker
        When  Select Authorization profile
        Then Click on Modify Icon in front of authorization profile to modify
        Then Logout
        Given Login into Mobiquity Portal as System admin Checker1
        Then User approval for modified Authorization profile

    # # # Author: Sudheer Baraker
    # # # Last Updated: 18/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_152
    # # #


    Scenario: To verify that System admin should be able to delete an authorization profile
        Given Login into Mobiquity Portal as System admin Maker
        When  Select Authorization profile
        Then Click on Modify Icon in front of authorization profile to delete

