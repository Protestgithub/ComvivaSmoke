Feature: Auth Profile Creation for Business User

    #######################   Authorization Profile Creation ##########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #

     Scenario: To verify that system admin should be able to add Business User authorization profile

        #Business -- Distributor
        Given Login into Mobiquity Portal as System admin Maker
          When Select Authorization profile and add profile
            And  select Distributor user type and select user role
          Then Fill all Details and Create Distributor authorization profile

          Scenario: Approval of added Business User profile
          Given Login into Mobiquity Portal as System admin Checker1
        Then User approval for Authorization profile