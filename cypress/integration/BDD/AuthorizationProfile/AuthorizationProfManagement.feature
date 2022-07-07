Feature: Authorization profile

    #######################   Authorization Profile Management ##########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #
 
    Scenario: To verify that system admin should be able to add authorization profile
        ### Subscriber M1S1 ###
        Given Login into Mobiquity Portal as System admin User
          When  Select Authorization profile and add profile
          And  select Subscriber user type and select user role
          Then Fill all Details and Create Subscriber authorization profile
          Then Logout
          Given Login into Mobiquity Portal as another System admin User after logout
          Then User approval for Authorization profile

        #Administrator -- BusinessAdmin
      #
          When  Select Authorization profile and add profile
          And  select BusinessAdmin user type and select user role
          Then Fill all Details and Create BusinessAdmin authorization profile
          Then Logout
          Given Login into Mobiquity Portal as another System admin User after logout
          Then User approval for Authorization profile

        # # #Administrator -- CustomercareAdmin
          When  Select Authorization profile and add profile
          And  select CustomercareAdmin user type and select user role
          Then Fill all Details and Create CustomercareAdmin authorization profile
          Then Logout
          Given Login into Mobiquity Portal as another System admin User after logout
          Then User approval for Authorization profile

        #Business -- TelcoOperator
          When Select Authorization profile and add profile
            And  select TelcoOperator user type and select user role
          Then Fill all Details and Create TelcoOperator authorization profile
          Then Logout
          Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for Authorization profile

        # #Business -- Agent
        When  Select Authorization profile and add profile
        And   select Agent user type and select user role
        Then Fill all Details and Create Agent authorization profile
        Then Logout
        Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for Authorization profile


    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_150
    # # #

    Scenario: To verify that system admin should be able to View Authorization profile for the selected category
        Given Login into Mobiquity Portal as System admin User
        When  Select Authorization profile
        Then View Profiles


    # # # Author: Sudheer Baraker
    # # # Last Updated: 18/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_151
    # # #


    Scenario: To verify that system admin should be able to modify an already created authorization profile
        Given Login into Mobiquity Portal as System admin User
        When  Select Authorization profile
        Then Click on Modify Icon in front of authorization profile to modify
        Then Logout
        Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for modified Authorization profile

    # # # Author: Sudheer Baraker
    # # # Last Updated: 18/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_152
    # # #


    Scenario: To verify that System admin should be able to delete an authorization profile
        Given Login into Mobiquity Portal as System admin User
        When  Select Authorization profile
        Then Click on Modify Icon in front of authorization profile to delete

