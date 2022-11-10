Feature: Auth Profile Creation for Business Admin

    #######################   Authorization Profile Creation ##########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #

    Scenario: To verify that system admin should be able to add BusinessAdmin authorization profile
        #Administrator -- BusinessAdmin
      #
        Given Login into Mobiquity Portal as System admin Maker
          When  Select Authorization profile and add profile
          And  select BusinessAdmin user type and select user role
          Then Fill all Details and Create BusinessAdmin authorization profile
          Then Logout

          Scenario: Approval of added Business Admin profile
          Given Login into Mobiquity Portal as another System admin User after logout
          Then User approval for Authorization profile