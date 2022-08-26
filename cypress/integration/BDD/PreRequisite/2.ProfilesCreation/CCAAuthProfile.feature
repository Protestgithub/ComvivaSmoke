Feature: Profiles Creation

    #######################   Authorization Profile Creation ##########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #

      Scenario: To verify that system admin should be able to add CustomercareAdmin authorization profile
        # # #Administrator -- CustomercareAdmin
        Given Login into Mobiquity Portal as System admin Maker
          When  Select Authorization profile and add profile
          And  select CustomercareAdmin user type and select user role
          Then Fill all Details and Create CustomercareAdmin authorization profile
          Then Logout
          Given Login into Mobiquity Portal as another System admin User after logout
          Then User approval for Authorization profile